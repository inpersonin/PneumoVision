// ============================================================
// PneumoVision AI — Model Configuration
// ============================================================
// All model parameters, metrics, and dataset stats in one place.
// Replace placeholder values ("—") with real data after training.
// ============================================================

export const MODEL_INFO = {
  modelType: "Convolutional Neural Network",
  trainingMethod: "Supervised Classification",
  transferLearning: "ResNet18 (ImageNet Pretrained)",
  framework: "PyTorch",
  inputResolution: "224 × 224",
  dataset: "Chest X-Ray (Pneumonia)",
  numClasses: 2,
  lossFunction: "Cross-Entropy Loss",
  optimizer: "Adam",
  batchSize: 32,
  epochs: 10,
  learningRate: 0.001,
  dataAugmentation: "Random Horizontal Flip, Random Rotation, Color Jitter",
  architecture: "ResNet18",
};

export const PERFORMANCE_METRICS = {
  accuracy: "—",
  precision: "—",
  recall: "—",
  f1Score: "—",
  rocAuc: "—",
  validationAccuracy: "—",
  trainingAccuracy: "—",
  trainingLoss: "—",
  validationLoss: "—",
  confusionMatrix: {
    truePositive: "—",
    trueNegative: "—",
    falsePositive: "—",
    falseNegative: "—",
  },
};

export const DATASET_INFO = {
  name: "Chest X-Ray Images (Pneumonia)",
  source: "Kaggle",
  trainingImages: "—",
  validationImages: "—",
  testingImages: "—",
  classDistribution: {
    normal: "—",
    pneumonia: "—",
  },
  imageResolution: "Variable (resized to 224×224)",
  augmentations: [
    "Random Horizontal Flip",
    "Random Rotation (±10°)",
    "Color Jitter",
    "Normalization (ImageNet stats)",
  ],
};

// Placeholder chart data — replace with real training logs
export const CHART_DATA = {
  trainingLoss: [
    { epoch: 1, value: 0.65 },
    { epoch: 2, value: 0.45 },
    { epoch: 3, value: 0.35 },
    { epoch: 4, value: 0.28 },
    { epoch: 5, value: 0.22 },
    { epoch: 6, value: 0.18 },
    { epoch: 7, value: 0.15 },
    { epoch: 8, value: 0.12 },
    { epoch: 9, value: 0.10 },
    { epoch: 10, value: 0.09 },
  ],
  validationLoss: [
    { epoch: 1, value: 0.60 },
    { epoch: 2, value: 0.42 },
    { epoch: 3, value: 0.33 },
    { epoch: 4, value: 0.29 },
    { epoch: 5, value: 0.25 },
    { epoch: 6, value: 0.23 },
    { epoch: 7, value: 0.21 },
    { epoch: 8, value: 0.20 },
    { epoch: 9, value: 0.19 },
    { epoch: 10, value: 0.18 },
  ],
  accuracy: [
    { epoch: 1, training: 62, validation: 65 },
    { epoch: 2, training: 72, validation: 74 },
    { epoch: 3, training: 78, validation: 79 },
    { epoch: 4, training: 83, validation: 82 },
    { epoch: 5, training: 86, validation: 85 },
    { epoch: 6, training: 89, validation: 87 },
    { epoch: 7, training: 91, validation: 88 },
    { epoch: 8, training: 93, validation: 89 },
    { epoch: 9, training: 94, validation: 90 },
    { epoch: 10, training: 95, validation: 90 },
  ],
  rocCurve: [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.02, tpr: 0.45 },
    { fpr: 0.05, tpr: 0.68 },
    { fpr: 0.1, tpr: 0.80 },
    { fpr: 0.15, tpr: 0.86 },
    { fpr: 0.2, tpr: 0.90 },
    { fpr: 0.3, tpr: 0.93 },
    { fpr: 0.4, tpr: 0.95 },
    { fpr: 0.6, tpr: 0.97 },
    { fpr: 0.8, tpr: 0.99 },
    { fpr: 1.0, tpr: 1.0 },
  ],
};

export const TECH_STACK = [
  { name: "Python", role: "Core Language", icon: "Code2" },
  { name: "PyTorch", role: "Deep Learning Framework", icon: "Cpu" },
  { name: "Torchvision", role: "Computer Vision Library", icon: "Eye" },
  { name: "FastAPI", role: "Backend API Framework", icon: "Zap" },
  { name: "React", role: "Frontend Framework", icon: "Atom" },
  { name: "Tailwind CSS", role: "Utility-First Styling", icon: "Paintbrush" },
  { name: "Framer Motion", role: "Animation Library", icon: "Sparkles" },
  { name: "Hugging Face", role: "Model Deployment", icon: "Cloud" },
  { name: "GitHub Pages", role: "Frontend Hosting", icon: "Globe" },
  { name: "GitHub", role: "Version Control", icon: "GitFork" },
];

export const ARCHITECTURE_STEPS = [
  {
    title: "Chest X-Ray Input",
    description: "Raw medical image fed into the pipeline",
    icon: "Image",
  },
  {
    title: "Preprocessing",
    description: "Data augmentation and normalization applied",
    icon: "Settings",
  },
  {
    title: "Resize 224×224",
    description: "Standardized input dimensions for the model",
    icon: "Maximize2",
  },
  {
    title: "Normalization",
    description: "ImageNet mean and standard deviation applied",
    icon: "Sliders",
  },
  {
    title: "ResNet18 Backbone",
    description: "Pretrained convolutional neural network extracts features",
    icon: "Brain",
  },
  {
    title: "Feature Extraction",
    description: "High-level representations learned from X-ray patterns",
    icon: "Layers",
  },
  {
    title: "Classification Layer",
    description: "Fully connected layer maps features to class logits",
    icon: "GitBranch",
  },
  {
    title: "Probability Output",
    description: "Softmax activation produces class probabilities",
    icon: "BarChart3",
  },
  {
    title: "Prediction",
    description: "Final diagnosis: Normal or Pneumonia",
    icon: "CheckCircle",
  },
];

// Links — update with your actual URLs
export const LINKS = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  huggingface: "https://huggingface.co",
};
