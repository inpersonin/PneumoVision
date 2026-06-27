import { ARCHITECTURE_STEPS } from "../../config/modelConfig";
import Card from "../ui/Card";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeader from "../ui/SectionHeader";
import * as Icons from "lucide-react";

export default function Architecture() {
  return (
    <section id="architecture" className="section-padding relative bg-black">
      {/* Spotlight behind */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-white/[0.006] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Pipeline Architecture"
          subtitle="End-to-end medical image preprocessing and classification pipeline"
        />

        <div className="relative mt-20 pl-8 sm:pl-16">
          {/* Main vertical line */}
          <div className="absolute left-[16px] sm:left-[32px] top-4 bottom-4 w-[1px] bg-white/10 overflow-hidden">
            {/* Animated traveling light dot on vertical pipeline line */}
            <div className="absolute w-full h-[150px] timeline-glow-line" />
          </div>

          <div className="space-y-10">
            {ARCHITECTURE_STEPS.map((step, index) => {
              const IconComponent = Icons[step.icon] || Icons.Settings;

              return (
                <div key={step.title} className="relative group">
                  {/* Timeline indicator node */}
                  <div className="absolute -left-[40px] sm:-left-[56px] top-6 w-9 h-9 rounded-full bg-black border border-white/10 group-hover:border-white/40 flex items-center justify-center z-10 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-white animate-pulse transition-all duration-300" />
                  </div>

                  {/* Timeline content card */}
                  <AnimatedSection delay={index * 0.05}>
                    <Card className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-white/5 bg-white/[0.015]">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/[0.04] group-hover:border-white/10 transition-all duration-300">
                        <IconComponent size={20} className="text-text-secondary group-hover:text-white transition-colors duration-300" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-text-muted">
                            STAGE 0{index + 1}
                          </span>
                          <h4 className="text-sm font-semibold text-white tracking-wide">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </Card>
                  </AnimatedSection>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
