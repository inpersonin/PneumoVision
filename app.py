"""
PneumoVision AI — Hugging Face Space inference backend.

Loads a fine-tuned ResNet18 checkpoint and exposes a /predict API.
Serves the built React frontend from ./dist when present.
"""

from __future__ import annotations

import io
import json
import logging
from pathlib import Path
from contextlib import asynccontextmanager
from typing import Any

import torch
import torch.nn as nn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image
from torchvision import models, transforms

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "pneumonia_model.pt"
METRICS_PATH = ROOT / "metrics" / "metrics.json"
HISTORY_PATH = ROOT / "metrics" / "history.json"
DIST_DIR = ROOT / "dist"

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]

DEFAULT_CLASS_NAMES = ["NORMAL", "PNEUMONIA"]

PREPROCESS = transforms.Compose(
    [
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
    ]
)

@asynccontextmanager
async def lifespan(_: FastAPI):
    load_model()
    yield


app = FastAPI(
    title="PneumoVision AI",
    description="Chest X-ray pneumonia detection inference API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_model: nn.Module | None = None
_class_names: list[str] = DEFAULT_CLASS_NAMES.copy()
_device: torch.device = torch.device("cpu")


def _resolve_device() -> torch.device:
    if torch.cuda.is_available():
        return torch.device("cuda")
    if hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        return torch.device("mps")
    return torch.device("cpu")


def _build_resnet18(num_classes: int) -> nn.Module:
    model = models.resnet18(weights=None)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    return model


def _extract_state_dict(checkpoint: Any) -> dict[str, torch.Tensor]:
    if isinstance(checkpoint, dict):
        for key in ("model_state_dict", "state_dict", "model"):
            if key in checkpoint and isinstance(checkpoint[key], dict):
                return checkpoint[key]
        if all(isinstance(v, torch.Tensor) for v in checkpoint.values()):
            return checkpoint
    raise ValueError("Unsupported checkpoint format")


def load_model() -> None:
    global _model, _class_names, _device

    if not MODEL_PATH.exists():
        logger.warning("Model checkpoint not found at %s", MODEL_PATH)
        return

    _device = _resolve_device()
    logger.info("Using device: %s", _device)

    checkpoint = torch.load(MODEL_PATH, map_location=_device, weights_only=False)

    if isinstance(checkpoint, dict):
        if "class_names" in checkpoint:
            _class_names = [str(c).upper() for c in checkpoint["class_names"]]
        elif "classes" in checkpoint:
            _class_names = [str(c).upper() for c in checkpoint["classes"]]

    num_classes = len(_class_names)
    model = _build_resnet18(num_classes)

    if isinstance(checkpoint, nn.Module):
        model = checkpoint
    else:
        state_dict = _extract_state_dict(checkpoint)
        model.load_state_dict(state_dict, strict=True)

    model.to(_device)
    model.eval()
    _model = model
    logger.info("Model loaded successfully. Classes: %s", _class_names)


def _load_json(path: Path) -> dict | list | None:
    if not path.exists():
        return None
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def _preprocess_image(image_bytes: bytes) -> torch.Tensor:
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid image file.") from exc

    tensor = PREPROCESS(image).unsqueeze(0)
    return tensor.to(_device)


def _format_probabilities(probs: torch.Tensor) -> dict[str, float]:
    return {
        name: round(float(probs[i].item()), 4)
        for i, name in enumerate(_class_names)
    }



@app.get("/health")
async def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "model_loaded": _model is not None,
        "device": str(_device),
        "classes": _class_names,
    }


@app.get("/metrics")
async def get_metrics() -> JSONResponse:
    metrics = _load_json(METRICS_PATH)
    history = _load_json(HISTORY_PATH)
    if metrics is None and history is None:
        raise HTTPException(status_code=404, detail="Metrics not found.")
    return JSONResponse({"metrics": metrics, "history": history})


@app.post("/predict")
async def predict(file: UploadFile = File(...)) -> dict[str, Any]:
    if _model is None:
        raise HTTPException(
            status_code=503,
            detail="Model checkpoint is not loaded. Upload pneumonia_model.pt to the Space repository.",
        )

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Upload must be an image file.")

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty file uploaded.")

    if len(image_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File exceeds 10 MB limit.")

    tensor = _preprocess_image(image_bytes)

    with torch.no_grad():
        logits = _model(tensor)
        probabilities = torch.softmax(logits, dim=1)[0]
        confidence, predicted_idx = torch.max(probabilities, dim=0)

    prediction = _class_names[int(predicted_idx.item())]

    return {
        "prediction": prediction,
        "probabilities": _format_probabilities(probabilities),
        "confidence": round(float(confidence.item()), 4),
    }


if DIST_DIR.exists():
    app.mount("/assets", StaticFiles(directory=DIST_DIR / "assets"), name="assets")

    @app.get("/")
    async def serve_index() -> FileResponse:
        return FileResponse(DIST_DIR / "index.html")

    @app.get("/favicon.svg")
    async def serve_favicon() -> FileResponse:
        return FileResponse(DIST_DIR / "favicon.svg")

    @app.get("/icons.svg")
    async def serve_icons() -> FileResponse:
        return FileResponse(DIST_DIR / "icons.svg")
