import AnimatedSection from "./AnimatedSection";

export default function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <AnimatedSection className={`text-center flex flex-col items-center ${className}`}>
      {/* Small dot decoration */}
      <div className="w-1 h-1 rounded-full bg-white/30 mb-4 animate-pulse" />
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm md:text-base text-text-secondary mt-3.5 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
