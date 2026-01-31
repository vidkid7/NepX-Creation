"use client";

import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Shield,
  HeadphonesIcon,
  Sparkles,
  Target,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import FadeIn from "@/components/animations/FadeIn";

const reasons = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We deliver pixel-perfect designs and clean, scalable code that exceeds industry standards.",
    highlight: "100% Quality Guarantee",
  },
  {
    icon: Sparkles,
    title: "Design Excellence",
    description:
      "Our design-first approach ensures visually stunning and user-centric digital experiences.",
    highlight: "Award-Winning Design",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We respect deadlines and consistently deliver projects on schedule without compromising quality.",
    highlight: "95% On-Time Rate",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Security-first development practices ensure your data and applications are always protected.",
    highlight: "Enterprise-Grade Security",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock support ensures your systems run smoothly and issues are resolved quickly.",
    highlight: "Always Available",
  },
  {
    icon: Target,
    title: "Results Focused",
    description:
      "We measure success by your business outcomes, not just project completion.",
    highlight: "ROI Driven",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[200px]" />

      <div className="container-custom mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <SectionHeading
              label="Why Choose Us"
              title="Building Trust Through Excellence"
              description="We're not just another IT company. We're your strategic partner in digital transformation, committed to delivering exceptional results."
              align="left"
            />

            <FadeIn delay={0.2}>
              <div className="space-y-6">
                <p className="text-gray-400 leading-relaxed">
                  With years of experience and a passion for innovation, we've helped
                  countless businesses achieve their digital goals. Our team combines
                  technical expertise with creative vision to deliver solutions that
                  truly make a difference.
                </p>

                {/* Key stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { value: "5+", label: "Years" },
                    { value: "100+", label: "Projects" },
                    { value: "99%", label: "Satisfaction" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-center p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5"
                    >
                      <div className="text-2xl font-heading font-bold gradient-text">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right - Reasons Grid */}
          <StaggerChildren className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <StaggerItem key={index}>
                <GlassCard className="h-full group">
                  <div className="space-y-3">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all"
                    >
                      <reason.icon className="w-5 h-5 text-primary" />
                    </motion.div>

                    {/* Title */}
                    <h4 className="text-lg font-heading font-semibold text-white">
                      {reason.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {reason.description}
                    </p>

                    {/* Highlight */}
                    <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {reason.highlight}
                    </span>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
