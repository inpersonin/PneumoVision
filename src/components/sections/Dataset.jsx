import { DATASET_INFO } from "../../config/modelConfig";
import Card from "../ui/Card";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeader from "../ui/SectionHeader";
import { Database, Image, Layers, Shuffle, Maximize2 } from "lucide-react";

const splitCards = [
  { label: "Training Split", value: DATASET_INFO.trainingImages, icon: Image },
  { label: "Validation Split", value: DATASET_INFO.validationImages, icon: Layers },
  { label: "Testing Split", value: DATASET_INFO.testingImages, icon: Database },
];

export default function Dataset() {
  const isPlaceholder = DATASET_INFO.trainingImages === "—";
  
  return (
    <section id="dataset" className="section-padding relative">
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Dataset Overview"
          subtitle="Distribution splits and preprocessing techniques of the chest X-ray cohort"
        />

        {/* Split Stats */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          {splitCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <AnimatedSection key={card.label} delay={index * 0.05}>
                <Card className="p-6 flex flex-col justify-between h-[155px] group">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                      {card.label}
                    </span>
                    <Icon size={14} className="text-text-muted group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <div className="mt-4">
                    <p className={`text-4xl font-semibold tracking-tight ${isPlaceholder ? "text-text-muted font-normal" : "text-white font-mono"}`}>
                      {card.value}
                    </p>
                    <p className="text-[9px] font-mono text-text-muted uppercase tracking-wider mt-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      Images allocated
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Details Row */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Class Distribution */}
          <AnimatedSection delay={0.05}>
            <Card className="p-6 h-[220px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Database size={14} className="text-text-secondary" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                    Class Distribution
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-text-secondary font-mono mb-1">
                      <span>Normal</span>
                      <span>{DATASET_INFO.classDistribution.normal}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white/40 rounded-full" style={{ width: isPlaceholder ? "0%" : "30%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-text-secondary font-mono mb-1">
                      <span>Pneumonia</span>
                      <span>{DATASET_INFO.classDistribution.pneumonia}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: isPlaceholder ? "0%" : "70%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[9px] font-mono text-text-muted mt-2">
                *Cohort metrics are dynamically calculated.
              </p>
            </Card>
          </AnimatedSection>

          {/* Image Resolution */}
          <AnimatedSection delay={0.1}>
            <Card className="p-6 h-[220px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Maximize2 size={14} className="text-text-secondary" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                    Resolution Specs
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-text-secondary">
                  Input dimension constraints:
                </p>
                <p className="text-2xl font-semibold font-mono text-white mt-2">
                  {DATASET_INFO.imageResolution}
                </p>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  Images normalized and resized using bilinear interpolation pipeline.
                </p>
              </div>
            </Card>
          </AnimatedSection>

          {/* Augmentations list */}
          <AnimatedSection delay={0.15}>
            <Card className="p-6 h-[220px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shuffle size={14} className="text-text-secondary" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
                    Data Augmentation
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {DATASET_INFO.augmentations.map((aug) => (
                    <li key={aug} className="text-xs text-text-secondary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      {aug}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
