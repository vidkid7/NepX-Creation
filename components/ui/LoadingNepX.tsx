"use client";

import { motion } from "framer-motion";

interface LoadingNepXProps {
  size?: "sm" | "md" | "lg";
}

export default function LoadingNepX({ size = "md" }: LoadingNepXProps) {
  const sizes = {
    sm: { text: "text-xl", svg: 40 },
    md: { text: "text-3xl", svg: 56 },
    lg: { text: "text-4xl", svg: 72 },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center justify-center">
      {/* NepX Logo */}
      <div className={`flex items-center ${currentSize.text} font-heading font-bold gap-1`}>
        {/* Nep - Simple white text */}
        <span className="text-white">Nep</span>

        {/* X with glowing stroke animation */}
        <div className="relative" style={{ width: currentSize.svg, height: currentSize.svg }}>
          <svg
            width={currentSize.svg}
            height={currentSize.svg}
            viewBox="0 0 100 100"
            className="absolute inset-0"
          >
            {/* Static X outline (gray/dim) */}
            <path
              d="M 25,25 L 75,75 M 75,25 L 25,75"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated glowing red stroke */}
            <motion.path
              d="M 25,25 L 75,75 M 75,25 L 25,75"
              fill="none"
              stroke="#ff0000"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="140"
              initial={{ strokeDashoffset: 140 }}
              animate={{ strokeDashoffset: -140 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 4px rgba(255, 0, 0, 1))",
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
