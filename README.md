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

# PneumoVision AI

Chest X-ray pneumonia detection using a fine-tuned **ResNet18** (PyTorch).

Upload a chest X-ray image to receive a classification (**NORMAL** / **PNEUMONIA**) with class probabilities and confidence score.

## Deployment checklist

1. Place `pneumonia_model.pt` in the repository root (required for inference).
2. Build the frontend: `npm install && npm run build`
3. Push to this Space — the Docker image serves both the UI and `/predict` API.

## API

**POST** `/predict` — multipart form upload with field `file`

```json
{
  "prediction": "NORMAL",
  "probabilities": { "NORMAL": 0.92, "PNEUMONIA": 0.08 },
  "confidence": 0.92
}
```

**GET** `/health` — model and device status  
**GET** `/metrics` — training metrics and history JSON

## Disclaimer

This tool is developed for research and educational purposes only. It is not intended for clinical diagnosis, medical decision-making, or replacement of professional healthcare advice.

## Links

- GitHub: [inpersonin](https://github.com/inpersonin)
- Space: [inpersonin/PneumoVision](https://huggingface.co/spaces/inpersonin/PneumoVision)
