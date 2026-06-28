---
title: PneumoVision AI
emoji: 🫁
colorFrom: gray
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
license: mit
---

<div align="center">

# 🫁 PneumoVision AI

**Deep Learning–Powered Chest X-ray Pneumonia Detection**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-181717?style=for-the-badge)](https://inpersonin.github.io/PneumoVision/)
[![Hugging Face](https://img.shields.io/badge/🤗_Space-Hugging_Face-FFD21E?style=for-the-badge)](https://huggingface.co/spaces/inpersonin/PneumoVision)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.2+-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)

<br />

*An end-to-end medical imaging system that classifies chest X-rays as **Normal** or **Pneumonia** using a fine-tuned ResNet18 convolutional neural network. Built for academic research and educational demonstration.*

<br />

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Model Performance](#-model-performance)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Dataset](#-dataset)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Disclaimer](#-disclaimer)
- [License](#-license)

---

## 🔬 Overview

PneumoVision AI is a full-stack medical image classification platform consisting of:

- **🧠 Deep Learning Backend** — A fine-tuned ResNet18 model served via FastAPI, accepting chest X-ray uploads and returning real-time classification probabilities.
- **🎨 Interactive Frontend** — A premium dark-themed React dashboard with animated training analytics, pipeline visualizations, and a drag-and-drop inference interface.
- **☁️ Dual Deployment** — Static frontend hosted on GitHub Pages with API calls routed to the Hugging Face Space, which also serves as a standalone full-stack application.

### Key Features

| Feature | Description |
|---|---|
| **Real-time Inference** | Upload any chest X-ray and receive instant predictions with confidence scores |
| **Training Analytics** | Interactive Recharts visualizations of training/validation loss curves and accuracy progression |
| **Model Transparency** | Full hyperparameter display, architecture pipeline, and performance metrics |
| **Responsive Design** | Glassmorphic UI with Framer Motion animations, optimized for desktop and mobile |
| **REST API** | Clean `/predict` endpoint for programmatic integration |

---

## 📊 Model Performance

The model was evaluated on a held-out test set of **624 images** from the Kaggle Chest X-Ray Pneumonia dataset.

| Metric | Score |
|:---|:---|
| **Test Accuracy** | 86.2% |
| **Precision** | 82.6% |
| **Recall** | 98.7% |
| **F1 Score** | 90.0% |
| **ROC-AUC** | 0.957 |
| **Validation Accuracy** | 97.4% |
| **Training Accuracy** | 98.1% |

> The model achieves **98.7% recall** — meaning it correctly identifies nearly all pneumonia cases, which is critical in a clinical screening context where false negatives are costly.

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PneumoVision AI Pipeline                  │
├─────────────┬───────────────────────┬───────────────────────┤
│  Input      │  Model                │  Output               │
│             │                       │                       │
│  Chest      │  Resize (224×224)     │  Softmax              │
│  X-Ray  ──► │  Normalize (ImageNet) │  Probabilities   ──►  │
│  Image      │  ResNet18 Backbone    │  NORMAL / PNEUMONIA   │
│             │  Custom FC Head       │  + Confidence Score   │
└─────────────┴───────────────────────┴───────────────────────┘
```

### Transfer Learning Approach

The model leverages **ResNet18** pretrained on ImageNet (1M+ images, 1000 classes). The convolutional backbone is used as a frozen feature extractor, while the fully connected classification head is replaced with a custom 2-layer MLP:

```
ResNet18 Backbone (frozen)
    └── AdaptiveAvgPool2d → 512-dim feature vector
        └── Linear(512, 256) → ReLU → Dropout(0.3)
            └── Linear(256, 2) → [NORMAL, PNEUMONIA]
```

### Training Configuration

| Parameter | Value |
|:---|:---|
| Optimizer | Adam |
| Learning Rate | 0.001 |
| Loss Function | Cross-Entropy |
| Batch Size | 32 |
| Epochs | 8 |
| Augmentations | Random Horizontal Flip, Random Rotation (±10°), Color Jitter |
| Normalization | ImageNet mean/std |

---

## 🛠 Tech Stack

### Backend
| Technology | Role |
|:---|:---|
| **Python 3.11** | Core language |
| **PyTorch** | Deep learning framework |
| **Torchvision** | Pretrained models and transforms |
| **FastAPI** | High-performance REST API |
| **Uvicorn** | ASGI server |
| **Pillow** | Image preprocessing |

### Frontend
| Technology | Role |
|:---|:---|
| **React 18** | Component framework |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Smooth animations and transitions |
| **Recharts** | Training analytics visualizations |
| **Lucide React** | Icon system |
| **Vite 8** | Build tooling and HMR |

### Deployment
| Platform | Purpose |
|:---|:---|
| **Hugging Face Spaces** | Full-stack Docker deployment (API + Frontend) |
| **GitHub Pages** | Static frontend hosting |
| **Docker** | Containerized backend |

---

## 📁 Dataset

The model was trained on the [Chest X-Ray Images (Pneumonia)](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia) dataset from Kaggle.

| Split | Images |
|:---|:---|
| Training | 5,216 |
| Validation | 16 |
| Testing | 624 |

**Class Distribution:**
- Normal: 1,583 (27%)
- Pneumonia: 4,273 (73%)

All images are resized to **224 × 224** pixels and normalized using ImageNet statistics before being fed to the model.

---

## 📂 Project Structure

```
pneumovision-ai/
├── app.py                    # FastAPI backend + model inference
├── pneumonia_model.pt        # Trained model checkpoint (Git LFS)
├── Dockerfile                # Container build for HF Spaces
├── requirements.txt          # Python dependencies
├── package.json              # Node.js dependencies
├── vite.config.js            # Vite + Tailwind CSS v4 config
├── index.html                # HTML entry point
│
├── metrics/
│   ├── metrics.json          # Test set evaluation metrics
│   └── history.json          # Epoch-by-epoch training history
│
├── dist/                     # Production build output
│   ├── index.html
│   └── assets/
│
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root layout component
    ├── index.css             # Theme tokens + global styles
    │
    ├── config/
    │   └── modelConfig.js    # Centralized model/chart data
    │
    ├── hooks/
    │   └── useInference.js   # API call hook
    │
    ├── metrics/              # JSON data (src-local copies)
    │   ├── metrics.json
    │   └── history.json
    │
    └── components/
        ├── layout/
        │   ├── Navbar.jsx    # Sticky glassmorphic navbar
        │   └── Footer.jsx    # Links and attribution
        │
        ├── sections/
        │   ├── Hero.jsx      # Landing hero with CTA
        │   ├── Detector.jsx  # Drag-and-drop inference UI
        │   ├── ModelInfo.jsx  # Hyperparameter grid
        │   ├── Architecture.jsx  # Pipeline timeline
        │   ├── Performance.jsx   # Metrics dashboard
        │   ├── Charts.jsx    # Recharts training analytics
        │   ├── Dataset.jsx   # Dataset split overview
        │   ├── TechStack.jsx # Technology cards
        │   └── About.jsx     # Project context
        │
        └── ui/
            ├── Card.jsx      # Spotlight hover card
            ├── AnimatedSection.jsx  # Viewport animation wrapper
            └── SectionHeader.jsx    # Section title component
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.11
- **Git LFS** (for model checkpoint)

### Installation

```bash
# Clone the repository
git clone https://github.com/inpersonin/PneumoVision.git
cd PneumoVision

# Pull the model checkpoint via Git LFS
git lfs pull

# Install frontend dependencies
npm install

# Install backend dependencies
pip install -r requirements.txt
```

### Development

```bash
# Start the backend (serves API on port 7860)
uvicorn app:app --host 0.0.0.0 --port 7860

# In a separate terminal, start the frontend dev server
npm run dev
```

The frontend dev server runs on `http://localhost:5173` and proxies `/predict` requests to the backend at `http://localhost:7860`.

### Production Build

```bash
npm run build
```

The compiled frontend is output to `dist/` and is automatically served by the FastAPI backend.

---

## 🔌 API Reference

### `POST /predict`

Upload a chest X-ray image for classification.

**Request:** `multipart/form-data` with field `file`

```bash
curl -X POST -F "file=@chest_xray.jpg" http://localhost:7860/predict
```

**Response:**

```json
{
  "prediction": "PNEUMONIA",
  "probabilities": {
    "NORMAL": 0.0823,
    "PNEUMONIA": 0.9177
  },
  "confidence": 0.9177
}
```

### `GET /health`

Returns model loading status and device information.

```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "cpu",
  "classes": ["NORMAL", "PNEUMONIA"]
}
```

### `GET /metrics`

Returns training metrics and epoch-by-epoch history.

---

## ☁️ Deployment

### Hugging Face Spaces (Docker)

The project is configured for one-click deployment to Hugging Face Spaces:

1. Create a new Space with **Docker** SDK
2. Push the repository (including the model checkpoint via Git LFS)
3. The Space will build the Docker image and start serving automatically

### GitHub Pages (Static Frontend)

The frontend is deployed separately to GitHub Pages:

```bash
# Build with the HF Space API URL baked in
VITE_API_URL=https://inpersonin-pneumovision.hf.space/predict npm run build

# Deploy to gh-pages branch
npx gh-pages -d dist
```

---

## ⚠️ Disclaimer

> This tool is developed for **research and educational purposes only**. It is not intended for clinical diagnosis, medical decision-making, or replacement of professional healthcare advice. While the model achieves strong performance metrics, it has not been validated in a clinical setting and should not be used as a diagnostic instrument.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ for academic research**

[Live Demo](https://inpersonin.github.io/PneumoVision/) · [Hugging Face Space](https://huggingface.co/spaces/inpersonin/PneumoVision) · [GitHub](https://github.com/inpersonin/PneumoVision)

</div>
