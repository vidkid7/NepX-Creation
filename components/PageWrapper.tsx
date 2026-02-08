"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingNepX from "@/components/ui/LoadingNepX";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🎬 PageWrapper: Loading animation started");
    
    // Show loading for 2.5 seconds on initial page load
    const timer = setTimeout(() => {
      console.log("✅ PageWrapper: Loading animation complete");
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Keep showing loading screen until timer completes
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
        <LoadingNepX size="lg" />
      </div>
    );
  }

  // Fade in content after loading
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
