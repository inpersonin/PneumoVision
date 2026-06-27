import Card from "../ui/Card";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeader from "../ui/SectionHeader";
import { BookOpen, GitCompare, Brain, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.005] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="About the Project"
          subtitle="Scientific context, transfer learning methodology, and academic goals"
        />

        <div className="space-y-6 mt-16">
          {/* Card 1 — Project Overview */}
          <AnimatedSection>
            <Card className="p-8 border border-white/5 bg-white/[0.015]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <BookOpen size={18} className="text-text-secondary" />
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  Project Overview
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                PneumoVision AI is a deep learning-based pneumonia detection system that analyzes chest X-ray images to classify them as Normal or Pneumonia. Developed as an academic research project, it demonstrates the practical application of convolutional neural networks in medical image classification and explores clinical diagnostic support capabilities.
              </p>
            </Card>
          </AnimatedSection>

          {/* Card 2 — Comparison */}
          <AnimatedSection delay={0.05}>
            <Card className="p-8 border border-white/5 bg-white/[0.015]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <GitCompare size={18} className="text-text-secondary" />
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  Model Methodology &amp; Comparison
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-normal">
                This project implements and compares two distinct architectural pipelines to chest X-ray classification to benchmark validation performance and parameter efficiency:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors duration-300">
                  <h5 className="text-xs font-semibold text-white tracking-wide mb-2">
                    CNN Trained From Scratch
                  </h5>
                  <p className="text-[11px] leading-relaxed text-text-secondary">
                    A custom convolutional neural network designed and trained entirely from the ground up on chest X-ray data, serving as the baseline model.
                  </p>
                </div>
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors duration-300">
                  <h5 className="text-xs font-semibold text-white tracking-wide mb-2">
                    Transfer Learning (ResNet18)
                  </h5>
                  <p className="text-[11px] leading-relaxed text-text-secondary">
                    A pretrained ResNet18 model, originally trained on ImageNet, fine-tuned on chest X-ray data. Transfer learning leverages pre-learned visual features, significantly improving performance and reducing training time.
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          {/* Card 3 — Why Transfer Learning */}
          <AnimatedSection delay={0.1}>
            <Card className="p-8 border border-white/5 bg-white/[0.015]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <Brain size={18} className="text-text-secondary" />
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  Why Transfer Learning Works
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                Transfer learning improves performance by leveraging weights pretrained on ImageNet — a large-scale dataset containing over 1 million images across 1,000 categories. The lower layers of ResNet18 have already learned to detect universal visual features such as edges, textures, and shapes. By fine-tuning only the higher layers on chest X-ray data, the model achieves superior accuracy with significantly less training data and time compared to training from scratch.
              </p>
            </Card>
          </AnimatedSection>

          {/* Card 4 — Context */}
          <AnimatedSection delay={0.15}>
            <Card className="p-8 border border-white/5 bg-white/[0.015]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <GraduationCap size={18} className="text-text-secondary" />
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  Academic Context
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                This project was developed for academic purposes to explore and demonstrate the effectiveness of deep learning in medical image analysis. While the results are promising, this system is intended solely as a research tool and educational demonstration — not as a clinical diagnostic instrument.
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
