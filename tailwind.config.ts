import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#00d4ff",
          50: "#edfffe",
          100: "#c0fffd",
          200: "#81fefb",
          300: "#3afbf8",
          400: "#00e5e8",
          500: "#00d4ff",
          600: "#009eac",
          700: "#007d8a",
          800: "#06636f",
          900: "#0a525d",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        dark: {
          DEFAULT: "#0a0a0a",
          100: "#1a1a1a",
          200: "#2a2a2a",
          300: "#3a3a3a",
          400: "#4a4a4a",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          light: "rgba(255, 255, 255, 0.1)",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-down": "fadeDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-blur": "fadeBlur 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "scale-up": "scaleUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "glow-pulse-slow": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 1s infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 30s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "gradient-x": "gradientX 15s ease infinite",
        "gradient-y": "gradientY 15s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "slide-up-fade": "slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down-fade": "slideDownFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "morph": "morph 8s ease-in-out infinite",
        "text-gradient": "textGradient 3s ease infinite",
        "border-beam": "borderBeam 4s linear infinite",
        "spotlight": "spotlight 2s ease-out forwards",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeBlur: {
          "0%": { opacity: "0", filter: "blur(10px)", transform: "translateY(20px)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)" 
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(0, 212, 255, 0.6), 0 0 80px rgba(0, 212, 255, 0.3)" 
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(-20px) rotate(-1deg)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        gradientY: {
          "0%, 100%": { backgroundPosition: "50% 0%" },
          "50%": { backgroundPosition: "50% 100%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { 
            opacity: "1",
            filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))"
          },
          "50%": { 
            opacity: "0.8",
            filter: "drop-shadow(0 0 25px rgba(0, 212, 255, 0.8))"
          },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        slideUpFade: {
          "0%": { opacity: "0", transform: "translateY(40px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        slideDownFade: {
          "0%": { opacity: "0", transform: "translateY(-40px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "50% 60% 30% 60% / 30% 70% 50% 60%" },
          "75%": { borderRadius: "60% 40% 60% 30% / 70% 30% 50% 60%" },
        },
        textGradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        borderBeam: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        spotlight: {
          "0%": { 
            opacity: "0",
            transform: "scale(0.5) translateY(-20px)"
          },
          "100%": { 
            opacity: "1",
            transform: "scale(1) translateY(0)"
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-gradient": "linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, hsla(191, 100%, 50%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(258, 90%, 66%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(191, 100%, 50%, 0.2) 0px, transparent 50%)",
        "hero-gradient": "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(0, 212, 255, 0.05) 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "64px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(0, 212, 255, 0.4)",
        "glow-xl": "0 0 60px rgba(0, 212, 255, 0.5), 0 0 100px rgba(0, 212, 255, 0.2)",
        "glow-accent": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-accent-lg": "0 0 40px rgba(139, 92, 246, 0.4)",
        "glow-mixed": "0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        "glass-lg": "0 16px 48px rgba(0, 0, 0, 0.4)",
        "inner-glow": "inset 0 0 20px rgba(0, 212, 255, 0.1)",
        "elevation-sm": "0 2px 8px rgba(0, 0, 0, 0.3)",
        "elevation-md": "0 4px 16px rgba(0, 0, 0, 0.4)",
        "elevation-lg": "0 8px 32px rgba(0, 0, 0, 0.5)",
        "3d": "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
      },
      scale: {
        "101": "1.01",
        "102": "1.02",
        "103": "1.03",
      },
      blur: {
        "3xl": "64px",
        "4xl": "96px",
      },
    },
  },
  plugins: [],
};
export default config;
