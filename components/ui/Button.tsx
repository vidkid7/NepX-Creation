"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  glowOnHover?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  glowOnHover = true,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white",
    secondary: "bg-white/5 text-white border border-white/10",
    ghost: "bg-transparent text-white hover:bg-white/5",
    outline: "bg-transparent text-primary border-2 border-primary/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-xl",
        "transition-all duration-300 ease-out overflow-hidden",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Animated glowing border for outline variant */}
      {variant === "outline" && (
        <>
          {/* Base border */}
          <span className="absolute inset-0 rounded-xl border-2 border-primary/30" />
          
          {/* Animated glow border */}
          <motion.span
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `conic-gradient(from ${isHovered ? "0deg" : "180deg"} at 50% 50%, 
                transparent 0deg,
                rgba(0, 212, 255, 0.8) 60deg,
                rgba(139, 92, 246, 0.8) 120deg,
                rgba(0, 212, 255, 0.8) 180deg,
                transparent 240deg,
                transparent 360deg
              )`,
              padding: "2px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            }}
          />

          {/* Glow effect */}
          <motion.span
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? [
                    "0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)",
                    "0 0 30px rgba(139, 92, 246, 0.4), 0 0 50px rgba(0, 212, 255, 0.2)",
                    "0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)",
                  ]
                : "0 0 0px rgba(0, 212, 255, 0)",
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Animated glow for secondary variant */}
      {variant === "secondary" && isHovered && glowOnHover && (
        <motion.span
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            boxShadow: [
              "inset 0 0 0 1px rgba(0, 212, 255, 0.3)",
              "inset 0 0 0 1px rgba(139, 92, 246, 0.3)",
              "inset 0 0 0 1px rgba(0, 212, 255, 0.3)",
            ],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Primary variant glow */}
      {variant === "primary" && isHovered && glowOnHover && (
        <motion.span
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)",
              "0 0 30px rgba(139, 92, 246, 0.5), 0 0 50px rgba(139, 92, 246, 0.3)",
              "0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Shine sweep effect for primary */}
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={isHovered ? { x: "100%", opacity: 1 } : { x: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          }}
        />
      )}

      {/* Loading spinner */}
      {isLoading && (
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </motion.svg>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </span>
    </motion.button>
  );
}
