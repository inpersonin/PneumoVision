import { MODEL_INFO } from "../../config/modelConfig";
import Card from "../ui/Card";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeader from "../ui/SectionHeader";
import {
  Brain,
  Target,
  Layers,
  Box,
  Maximize2,
  Database,
  GitBranch,
  BarChart3,
  Zap,
  Cpu,
  Clock,
  Gauge,
  Sparkles,
  Settings,
} from "lucide-react";

const infoItems = [
  { label: "Model Type", value: MODEL_INFO.modelType, icon: Brain },
  { label: "Training Method", value: MODEL_INFO.trainingMethod, icon: Target },
  { label: "Transfer Learning", value: MODEL_INFO.transferLearning, icon: Layers },
  { label: "Framework", value: MODEL_INFO.framework, icon: Box },
  { label: "Input Resolution", value: MODEL_INFO.inputResolution, icon: Maximize2 },
  { label: "Dataset", value: MODEL_INFO.dataset, icon: Database },
  { label: "Classes", value: MODEL_INFO.numClasses, icon: GitBranch },
  { label: "Loss Function", value: MODEL_INFO.lossFunction, icon: BarChart3 },
  { label: "Optimizer", value: MODEL_INFO.optimizer, icon: Zap },
  { label: "Batch Size", value: MODEL_INFO.batchSize, icon: Cpu },
  { label: "Epochs", value: MODEL_INFO.epochs, icon: Clock },
  { label: "Learning Rate", value: MODEL_INFO.learningRate, icon: Gauge },
  { label: "Data Augmentation", value: MODEL_INFO.dataAugmentation, icon: Sparkles },
  { label: "Architecture", value: MODEL_INFO.architecture, icon: Settings },
];

export default function ModelInfo() {
  return (
    <section id="model" className="section-padding relative">
      {/* Background soft lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.005] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Model Configuration"
          subtitle="Technical specifications and deep learning hyper-parameters"
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-16">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            const isNumeric = typeof item.value === "number" || item.label.includes("Resolution") || item.label.includes("Rate") || item.label.includes("Size") || item.label.includes("Epochs");

            return (
              <AnimatedSection key={item.label} delay={index * 0.03} className="h-full">
                <Card className="p-6 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.04] group-hover:border-white/10 transition-colors duration-300">
                        <Icon size={16} className="text-text-secondary" />
                      </div>
                      
                      {/* Active indicator */}
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white/70 transition-colors duration-300" />
                    </div>

                    <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider mt-5">
                      {item.label}
                    </p>
                  </div>

                  <p className={`text-sm font-medium mt-2 leading-relaxed ${isNumeric ? "font-mono text-white" : "text-text-primary"}`}>
                    {item.value}
                  </p>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
