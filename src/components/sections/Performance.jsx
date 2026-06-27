import { PERFORMANCE_METRICS } from "../../config/modelConfig";
import Card from "../ui/Card";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeader from "../ui/SectionHeader";
import {
  Target,
  Crosshair,
  RotateCcw,
  Hexagon,
  TrendingUp,
  BarChart3,
  Activity,
  Grid3X3,
} from "lucide-react";

const metrics = [
  { label: "Accuracy", value: PERFORMANCE_METRICS.accuracy, icon: Target },
  { label: "Precision", value: PERFORMANCE_METRICS.precision, icon: Crosshair },
  { label: "Recall", value: PERFORMANCE_METRICS.recall, icon: RotateCcw },
  { label: "F1 Score", value: PERFORMANCE_METRICS.f1Score, icon: Hexagon },
  { label: "ROC-AUC", value: PERFORMANCE_METRICS.rocAuc, icon: TrendingUp },
  { label: "Val. Accuracy", value: PERFORMANCE_METRICS.validationAccuracy, icon: BarChart3 },
  { label: "Train. Accuracy", value: PERFORMANCE_METRICS.trainingAccuracy, icon: Activity },
  { label: "Training Loss", value: PERFORMANCE_METRICS.trainingLoss, icon: TrendingUp },
  { label: "Validation Loss", value: PERFORMANCE_METRICS.validationLoss, icon: TrendingUp },
];

const confusionCells = [
  { label: "True Positive", value: PERFORMANCE_METRICS.confusionMatrix.truePositive, type: "tp" },
  { label: "False Positive", value: PERFORMANCE_METRICS.confusionMatrix.falsePositive, type: "fp" },
  { label: "False Negative", value: PERFORMANCE_METRICS.confusionMatrix.falseNegative, type: "fn" },
  { label: "True Negative", value: PERFORMANCE_METRICS.confusionMatrix.trueNegative, type: "tn" },
];

export default function Performance() {
  return (
    <section id="performance" className="section-padding relative bg-black">
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-white/[0.005] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Model Performance"
          subtitle="Empirical classification metrics and testing evaluations"
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const isPlaceholder = metric.value === "—";

            return (
              <AnimatedSection key={metric.label} delay={index * 0.04}>
                <Card className="p-6 flex flex-col justify-between h-[155px] group">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                      {metric.label}
                    </span>
                    <Icon size={14} className="text-text-muted group-hover:text-white transition-colors duration-300" />
                  </div>

                  <div className="mt-4">
                    <p className={`text-4xl font-semibold tracking-tight ${isPlaceholder ? "text-text-muted font-normal" : "text-white font-mono"}`}>
                      {metric.value}
                    </p>
                    <p className="text-[9px] font-mono text-text-muted uppercase tracking-wider mt-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      Academic validation metric
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Confusion Matrix */}
        <div className="mt-8">
          <AnimatedSection>
            <Card className="p-6 max-w-3xl mx-auto border border-white/10 bg-white/[0.01]">
              <div className="flex items-center gap-2 mb-6">
                <Grid3X3 size={16} className="text-text-secondary" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                  Confusion Matrix Output
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {confusionCells.map((cell) => {
                  const isPlaceholder = cell.value === "—";
                  
                  return (
                    <div
                      key={cell.label}
                      className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[120px] hover:border-white/15 transition-all duration-300"
                    >
                      <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">
                        {cell.label}
                      </span>
                      <p className={`text-3xl font-semibold tracking-tight mt-3 ${isPlaceholder ? "text-text-muted font-normal" : "text-white font-mono"}`}>
                        {cell.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
