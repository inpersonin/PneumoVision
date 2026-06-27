import { motion } from "framer-motion";

export default function ProgressBar({ label, value, className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-text-secondary tracking-wide">{label}</span>
        <span className="text-xs font-mono font-semibold text-white">
          {typeof value === "number" ? value.toFixed(1) : value}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/[0.02] relative">
        <motion.div
          className="h-full bg-gradient-to-r from-neutral-400 to-white rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        >
          {/* Glowing tip */}
          <div className="absolute right-0 top-0 h-full w-1 bg-white blur-[1px] rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
