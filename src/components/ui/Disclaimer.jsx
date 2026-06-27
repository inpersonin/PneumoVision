import { TriangleAlert } from "lucide-react";
import Card from "./Card";

export default function Disclaimer({ className = "" }) {
  return (
    <Card className={`p-6 border border-white/5 bg-white/[0.01] ${className}`} hover={false}>
      <div className="flex items-center gap-2 text-white font-medium text-xs mb-3 font-mono tracking-wider uppercase">
        <TriangleAlert size={14} className="text-text-secondary" />
        <span>Academic Research Disclaimer</span>
      </div>
      <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed font-normal">
        This application has been developed solely for academic research and educational purposes.
        It is not a certified medical device and must not be used for clinical diagnosis, treatment
        decisions, or as a substitute for professional medical advice. Always consult a qualified
        healthcare professional for medical evaluation and diagnosis.
      </p>
    </Card>
  );
}
