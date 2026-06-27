import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import Button from "../ui/Button";

const floatingCircles = [
  {
    className: "top-[15%] left-[5%] w-[450px] h-[450px]",
    y: [0, -40, 0],
    x: [0, 20, 0],
    duration: 20,
  },
  {
    className: "bottom-[10%] right-[5%] w-[400px] h-[400px]",
    y: [0, -30, 0],
    x: [0, -20, 0],
    duration: 24,
  },
  {
    className: "top-[40%] left-[25%] w-[500px] h-[500px]",
    y: [0, -25, 0],
    x: [0, 15, 0],
    duration: 28,
  },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Premium matrix grid backdrop */}
      <div className="absolute inset-0 tech-grid opacity-60 z-0 pointer-events-none" />

      {/* Massive radial breathing spotlight */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.45, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.025] rounded-full blur-[140px] pointer-events-none z-0"
      />

      {/* Moving blurred ambient glow blobs */}
      {floatingCircles.map((circle, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-white/[0.008] blur-[120px] pointer-events-none z-0 ${circle.className}`}
          animate={{ y: circle.y, x: circle.x }}
          transition={{
            repeat: Infinity,
            duration: circle.duration,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Research preview badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 border border-white/5 bg-white/[0.02] text-[11px] font-mono tracking-wider uppercase text-text-secondary px-4 py-1.5 rounded-full mb-8 backdrop-blur-md"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-ping" />
          <span>Research Preview</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent max-w-4xl mx-auto"
        >
          PneumoVision AI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto mt-8 leading-relaxed font-normal"
        >
          Chest X-ray Pneumonia Detection System
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 justify-center w-full sm:w-auto"
        >
          <Button
            variant="primary"
            icon={ArrowRight}
            onClick={() => scrollTo("detector")}
          >
            Try the Detector
          </Button>
          <Button
            variant="secondary"
            icon={Layers}
            onClick={() => scrollTo("architecture")}
          >
            View Architecture
          </Button>
        </motion.div>
      </div>

      {/* Decorative vertical line fade */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/10 to-transparent" />
    </section>
  );
}
