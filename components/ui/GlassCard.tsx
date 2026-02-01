"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useRef, MouseEvent, useState } from "react";

interface GlassCardProps {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  tilt3D?: boolean;
  className?: string;
}

export default function GlassCard({
  children,
  hover = true,
  glow = false,
  tilt3D = true,
  className,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  // Glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tilt3D) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);

    // Update glow position
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;
    glowX.set(percentX);
    glowY.set(percentY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt3D ? rotateX : 0,
        rotateY: tilt3D ? rotateY : 0,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative p-6 rounded-2xl overflow-hidden",
        "bg-white/[0.03] backdrop-blur-xl",
        "border border-white/[0.08]",
        hover && "hover:bg-white/[0.06]",
        glow && "shadow-glow",
        "transition-colors duration-300",
        className
      )}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isHovered
            ? `conic-gradient(from 0deg at 50% 50%, 
                rgba(0, 212, 255, 0.5), 
                rgba(139, 92, 246, 0.5), 
                rgba(0, 212, 255, 0.5))`
            : "transparent",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Interactive glow following cursor */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(600px circle at ${glowX.get()}% ${glowY.get()}%, rgba(0, 212, 255, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.03) 45%,
            rgba(255, 255, 255, 0.06) 50%,
            rgba(255, 255, 255, 0.03) 55%,
            transparent 60%
          )`,
        }}
      />

      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(0, 212, 255, 0.05), transparent, rgba(139, 92, 246, 0.05))",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Content with 3D depth */}
      <div
        className="relative z-10"
        style={{ transform: tilt3D ? "translateZ(30px)" : "none" }}
      >
        {children}
      </div>

      {/* Bottom shine line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6), rgba(139, 92, 246, 0.6), transparent)",
          width: isHovered ? "80%" : "0%",
          transition: "width 0.4s ease",
        }}
      />
    </motion.div>
  );
}
