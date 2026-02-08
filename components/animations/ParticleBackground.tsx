"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  hue: number;
  pulsePhase: number;
}

interface GradientOrb {
  x: number;
  y: number;
  size: number;
  hue: number;
  speed: number;
  angle: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const orbsRef = useRef<GradientOrb[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const fpsRef = useRef(60);
  const frameIntervalRef = useRef(1000 / 60);

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Performance: Use device pixel ratio for sharp rendering but limit for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      // Adaptive particle count based on screen size and performance
      const area = window.innerWidth * window.innerHeight;
      let particleCount;
      
      // More aggressive reduction for mobile devices
      if (window.innerWidth < 768) {
        particleCount = Math.min(Math.floor(area / 30000), 30); // Max 30 on mobile (reduced from 40)
      } else if (window.innerWidth < 1024) {
        particleCount = Math.min(Math.floor(area / 25000), 50); // Max 50 on tablet (reduced from 60)
      } else {
        particleCount = Math.min(Math.floor(area / 20000), 70); // Max 70 on desktop (reduced from 80)
      }
      
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2.5 + 0.5,
          opacity: 0,
          targetOpacity: Math.random() * 0.6 + 0.2,
          hue: Math.random() > 0.5 ? 191 : 258, // Primary or accent color
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const createGradientOrbs = () => {
      orbsRef.current = [
        { x: 0.2, y: 0.3, size: 400, hue: 191, speed: 0.0003, angle: 0 },
        { x: 0.8, y: 0.7, size: 350, hue: 258, speed: 0.0004, angle: Math.PI },
        { x: 0.5, y: 0.5, size: 300, hue: 191, speed: 0.0002, angle: Math.PI / 2 },
      ];
    };

    const drawGradientOrbs = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      orbsRef.current.forEach((orb) => {
        orb.angle += orb.speed * 16;
        const offsetX = Math.sin(orb.angle) * 100;
        const offsetY = Math.cos(orb.angle * 0.7) * 80;
        
        const x = orb.x * width + offsetX;
        const y = orb.y * height + offsetY;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.size);
        
        if (orb.hue === 191) {
          gradient.addColorStop(0, "rgba(0, 212, 255, 0.15)");
          gradient.addColorStop(0.5, "rgba(0, 212, 255, 0.05)");
          gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
        } else {
          gradient.addColorStop(0, "rgba(139, 92, 246, 0.12)");
          gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.04)");
          gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
    };

    const drawParticles = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      particlesRef.current.forEach((particle, i) => {
        // Smooth opacity transition
        particle.opacity = lerp(particle.opacity, particle.targetOpacity, 0.02);
        
        // Subtle pulse effect
        const pulse = Math.sin(time * 0.002 + particle.pulsePhase) * 0.2 + 0.8;
        const currentOpacity = particle.opacity * pulse;
        
        // Draw particle with glow
        const color = particle.hue === 191 ? "0, 212, 255" : "139, 92, 246";
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentOpacity * 0.1})`;
        ctx.fill();
        
        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentOpacity})`;
        ctx.fill();
      });

      // Draw connections with improved performance
      const connectionDistance = 120;
      const maxConnections = 3;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        let connections = 0;
        
        for (let j = i + 1; j < particlesRef.current.length && connections < maxConnections; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            const distance = Math.sqrt(distSq);
            const opacity = (1 - distance / connectionDistance) * 0.12 * particle.opacity;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            connections++;
          }
        }

        // Enhanced mouse interaction
        if (mouseRef.current.isActive) {
          const mdx = particle.x - mouseRef.current.x;
          const mdy = particle.y - mouseRef.current.y;
          const mouseDistSq = mdx * mdx + mdy * mdy;
          const mouseRadius = 180;

          if (mouseDistSq < mouseRadius * mouseRadius) {
            const mouseDistance = Math.sqrt(mouseDistSq);
            const opacity = (1 - mouseDistance / mouseRadius) * 0.35 * particle.opacity;
            
            // Draw gradient line to mouse
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              mouseRef.current.x, mouseRef.current.y
            );
            gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Subtle attraction effect
            const force = (1 - mouseDistance / mouseRadius) * 0.02;
            particle.vx -= mdx * force * 0.01;
            particle.vy -= mdy * force * 0.01;
          }
        }
      }
    };

    const updateParticles = (deltaTime: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const speedFactor = deltaTime / 16.67; // Normalize to 60fps

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx * speedFactor;
        particle.y += particle.vy * speedFactor;

        // Add slight damping
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        // Add very subtle random movement
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;

        // Clamp velocity
        const maxSpeed = 0.5;
        particle.vx = Math.max(-maxSpeed, Math.min(maxSpeed, particle.vx));
        particle.vy = Math.max(-maxSpeed, Math.min(maxSpeed, particle.vy));

        // Soft bounce off edges with some padding
        const padding = 50;
        if (particle.x < -padding) particle.x = width + padding;
        if (particle.x > width + padding) particle.x = -padding;
        if (particle.y < -padding) particle.y = height + padding;
        if (particle.y > height + padding) particle.y = -padding;
      });
    };

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      
      // Frame rate limiting for performance
      if (deltaTime >= frameIntervalRef.current) {
        lastTimeRef.current = currentTime - (deltaTime % frameIntervalRef.current);
        timeRef.current = currentTime;
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        ctx.clearRect(0, 0, width, height);
        
        drawGradientOrbs(currentTime);
        updateParticles(deltaTime);
        drawParticles(currentTime);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { 
        x: e.clientX, 
        y: e.clientY,
        isActive: true 
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
      createGradientOrbs();
    };

    // Visibility change handler for performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    createParticles();
    createGradientOrbs();
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [lerp]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: 0.6, // Reduced from 0.7 for better performance
        transform: "translateZ(0)",
      }}
      aria-hidden="true"
    />
  );
}
