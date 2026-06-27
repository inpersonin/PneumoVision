import { TriangleAlert } from "lucide-react";
import Card from "./Card";

export default function Disclaimer({ className = "" }) {
  return (
    <Card className={`p-6 border border-white/5 bg-white/[0.01] ${className}`} hover={false}>
      <div className="flex items-center gap-2 text-white font-medium text-xs mb-3 font-mono tracking-wider uppercase">
        <TriangleAlert size={14} className="text-text-secondary" />
        <span>Medical Disclaimer</span>
      </div>
      <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed font-normal">
        This tool is developed for research and educational purposes only. It is not intended
        for clinical diagnosis, medical decision-making, or replacement of professional
        healthcare advice.
      </p>
    </Card>
  );
}
