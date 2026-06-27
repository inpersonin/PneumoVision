import metricsData from "../../metrics/metrics.json";
import historyData from "../../metrics/history.json";

const pct = (value, digits = 1) => `${(value * 100).toFixed(digits)}%`;

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
  epochs: historyData.train_loss.length,
  learningRate: 0.001,
  dataAugmentation: "Random Horizontal Flip, Random Rotation, Color Jitter",
  architecture: "ResNet18",
};

const lastTrainAcc = historyData.train_acc.at(-1);
const lastValAcc = historyData.val_acc.at(-1);
const lastTrainLoss = historyData.train_loss.at(-1);
const lastValLoss = historyData.val_loss.at(-1);

export const PERFORMANCE_METRICS = {
  accuracy: pct(metricsData.test_accuracy),
  precision: pct(metricsData.precision),
  recall: pct(metricsData.recall),
  f1Score: pct(metricsData.f1_score),
  rocAuc: metricsData.auc.toFixed(3),
  validationAccuracy: pct(lastValAcc),
  trainingAccuracy: pct(lastTrainAcc),
  trainingLoss: lastTrainLoss.toFixed(4),
  validationLoss: lastValLoss.toFixed(4),
};

export const DATASET_INFO = {
  name: "Chest X-Ray Images (Pneumonia)",
  source: "Kaggle",
  trainingImages: "—",
  validationImages: "—",
  testingImages: "—",
  classDistribution: {
    normal: "NORMAL",
    pneumonia: "PNEUMONIA",
  },
  imageResolution: "Variable (resized to 224×224)",
  augmentations: [
    "Random Horizontal Flip",
    "Random Rotation (±10°)",
    "Color Jitter",
    "Normalization (ImageNet stats)",
  ],
};

const toEpochSeries = (values) =>
  values.map((value, index) => ({ epoch: index + 1, value }));

export const CHART_DATA = {
  trainingLoss: toEpochSeries(historyData.train_loss),
  validationLoss: toEpochSeries(historyData.val_loss),
  accuracy: historyData.train_acc.map((train, index) => ({
    epoch: index + 1,
    training: train * 100,
    validation: historyData.val_acc[index] * 100,
  })),
  testMetrics: [
    { name: "Accuracy", value: metricsData.test_accuracy * 100 },
    { name: "Precision", value: metricsData.precision * 100 },
    { name: "Recall", value: metricsData.recall * 100 },
    { name: "F1 Score", value: metricsData.f1_score * 100 },
    { name: "AUC", value: metricsData.auc * 100 },
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

export const LINKS = {
  github: "https://github.com/inpersonin",
  huggingface: "https://huggingface.co/spaces/inpersonin/PneumoVision",
};

export { metricsData, historyData };
