"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Script from "next/script";

type HeroContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  stats: Array<{ value: string; label: string }>;
};

export default function HeroSection() {
  const [content, setContent] = useState<HeroContent>({
    badge: "Premium IT Solutions",
    title: "We Build",
    titleHighlight: "Digital Excellence",
    description:
      "Transform your vision into reality with custom software, mobile apps, stunning websites for any industry, automation, video production, and digital marketing solutions that drive business growth.",
    stats: [
      { value: "100+", label: "Projects Delivered" },
      { value: "50+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
    ],
  });

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('/api/public/content/hero');
        const data = await response.json();
        if (data.success) {
          setContent(data.data);
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    }

    fetchContent();
  }, []);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-primary/10" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] opacity-20" />

      <div className="relative z-10 w-full pt-24 pb-12">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[calc(100vh-8rem)]">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {content.badge}
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight">
                  <span className="text-white">{content.title}</span>
                  <br />
                  <span className="gradient-text">{content.titleHighlight}</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.16 }}
                className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed"
              >
                {content.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.24 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={20} />}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Start Your Project
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Play size={20} />}
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Our Work
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.32 }}
                className="flex flex-wrap gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10"
              >
                {content.stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Spline 3D */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative order-1 lg:order-2 h-[280px] xs:h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[680px] w-full"
            >
              {/* Glow effect behind Spline */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-50" />

              {/* Spline Viewer - Responsive */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden">
                <Script
                  type="module"
                  src="https://unpkg.com/@splinetool/viewer@1.12.51/build/spline-viewer.js"
                  strategy="afterInteractive"
                />
                <spline-viewer
                  url="https://prod.spline.design/oehLr0xvIb1uvWQm/scene.splinecode"
                  loading-anim-type="spinner-small-dark"
                  className="spline-responsive"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "1rem",
                    willChange: "transform",
                    transform: "translateZ(0)",
                  }}
                />
              </div>

              {/* Floating elements - Responsive sizes */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden xs:block absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 lg:-top-6 lg:-right-6 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-accent rounded-xl sm:rounded-2xl blur-sm opacity-60"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden sm:block absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 lg:-bottom-6 lg:-left-6 w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-accent to-primary rounded-xl blur-sm opacity-50"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
