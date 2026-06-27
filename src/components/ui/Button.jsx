import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-neutral-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]",
  secondary:
    "border border-white/10 text-white backdrop-blur-md bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20",
};

const sizes = {
  small: "px-4 py-1.5 text-xs",
  medium: "px-6 py-2.5 text-sm font-medium",
  large: "px-8 py-3.5 text-sm font-medium tracking-wide",
};

export default function Button({
  children,
  variant = "primary",
  size = "large",
  onClick,
  className = "",
  icon: Icon,
  ...props
}) {
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.large;

  return (
    <motion.button
      className={`${variantClass} ${sizeClass} inline-flex items-center justify-center gap-2.5 rounded-full cursor-pointer transition-all duration-300 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {Icon && <Icon size={size === "small" ? 14 : 16} className="shrink-0" />}
      <span>{children}</span>
    </motion.button>
  );
}
