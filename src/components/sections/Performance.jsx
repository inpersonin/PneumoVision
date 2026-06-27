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
} from "lucide-react";

const metrics = [
  { label: "Test Accuracy", value: PERFORMANCE_METRICS.accuracy, icon: Target },
  { label: "Precision", value: PERFORMANCE_METRICS.precision, icon: Crosshair },
  { label: "Recall", value: PERFORMANCE_METRICS.recall, icon: RotateCcw },
  { label: "F1 Score", value: PERFORMANCE_METRICS.f1Score, icon: Hexagon },
  { label: "ROC-AUC", value: PERFORMANCE_METRICS.rocAuc, icon: TrendingUp },
  { label: "Val. Accuracy", value: PERFORMANCE_METRICS.validationAccuracy, icon: BarChart3 },
  { label: "Train. Accuracy", value: PERFORMANCE_METRICS.trainingAccuracy, icon: Activity },
  { label: "Training Loss", value: PERFORMANCE_METRICS.trainingLoss, icon: TrendingUp },
  { label: "Validation Loss", value: PERFORMANCE_METRICS.validationLoss, icon: TrendingUp },
];

export default function Performance() {
  return (
    <section id="performance" className="section-padding relative bg-black">
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-white/[0.005] rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Model Performance"
          subtitle="Empirical classification metrics from held-out test evaluation"
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

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
                    <p className="text-4xl font-semibold tracking-tight text-white font-mono">
                      {metric.value}
                    </p>
                    <p className="text-[9px] font-mono text-text-muted uppercase tracking-wider mt-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      Recorded from metrics.json
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
