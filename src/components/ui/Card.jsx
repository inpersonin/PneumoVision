import { motion } from "framer-motion";
import { useRef } from "react";

export default function Card({ children, className = "", hover = true, glass = true }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${
        glass
          ? "glass-panel"
          : "bg-surface-2 border border-border rounded-2xl"
      } ${className}`}
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
