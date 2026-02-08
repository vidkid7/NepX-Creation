"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directions = {
  up: { y: 15, x: 0 }, // Further reduced for faster animations
  down: { y: -15, x: 0 }, // Further reduced for faster animations
  left: { y: 0, x: 15 }, // Further reduced for faster animations
  right: { y: 0, x: -15 }, // Further reduced for faster animations
  none: { y: 0, x: 0 },
};

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.3, // Reduced from 0.4 to 0.3 for even snappier feel
  className = "",
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "-100px", // Increased from -50px for earlier trigger
    amount: 0.05 // Reduced from 0.1 for earlier trigger
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: directions[direction].x,
        y: directions[direction].y,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: directions[direction].x, y: directions[direction].y }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Optimized easing for snappier feel
      }}
      className={className}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      {children}
    </motion.div>
  );
}

// Additional component for staggered text animation
export function FadeInText({
  children,
  delay = 0,
  className = "",
  once = true,
}: {
  children: string;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-30px" });

  const words = children.split(" ");

  return (
    <motion.span ref={ref} className={`inline ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 15 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 15 }
          }
          transition={{
            duration: 0.3,
            delay: delay + index * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}
