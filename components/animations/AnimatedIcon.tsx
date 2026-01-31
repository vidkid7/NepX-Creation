"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  glowColor?: string;
}

export default function AnimatedIcon({
  icon: Icon,
  size = 24,
  className = "",
  glowColor = "rgba(0, 212, 255, 0.5)",
}: AnimatedIconProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotate: [0, -10, 10, 0],
      }}
      transition={{
        duration: 0.3,
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      className={cn(
        "relative inline-flex items-center justify-center p-3 rounded-xl",
        "bg-gradient-to-br from-primary/20 to-accent/20",
        "group cursor-pointer",
        className
      )}
      style={{
        boxShadow: `0 0 0 rgba(0, 212, 255, 0)`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />

      {/* Icon */}
      <Icon
        size={size}
        className="relative z-10 text-primary group-hover:text-white transition-colors duration-300"
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          border: "1px solid rgba(0, 212, 255, 0.5)",
          boxShadow: `0 0 20px ${glowColor}`,
        }}
      />
    </motion.div>
  );
}
