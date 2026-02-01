"use client";

import { motion } from "framer-motion";
import { Target, Eye, Rocket, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description:
      "We push boundaries with cutting-edge technologies, AI, and creative solutions that set new industry standards.",
  },
  {
    icon: Eye,
    title: "Quality Obsessed",
    description:
      "Every pixel, every line of code is crafted with meticulous attention to detail and premium standards.",
  },
  {
    icon: Rocket,
    title: "Full-Stack Expertise",
    description:
      "From web & mobile apps to automation and marketing — we handle everything under one roof.",
  },
  {
    icon: Users,
    title: "Client Focused",
    description:
      "Your success is our priority. We build lasting partnerships through transparent communication.",
  },
];

const stats = [
  { number: "100+", label: "Projects Completed" },
  { number: "50+", label: "Global Clients" },
  { number: "15+", label: "Team Experts" },
  { number: "99%", label: "Client Satisfaction" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px] translate-x-1/2" />

      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          label="About Us"
          title="Crafting Digital Excellence Since Day One"
          description="NepX Creation is a full-stack IT & digital solutions company dedicated to transforming businesses through innovative technology and design-first thinking."
        />

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Story */}
          <FadeIn direction="left">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                Building the Future of{" "}
                <span className="gradient-text">Digital Innovation</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                At NepX Creation, we believe in the power of technology to transform
                businesses and create meaningful impact. Our team of passionate
                developers, designers, and digital strategists work together to
                deliver solutions that exceed expectations.
              </p>
              <p className="text-gray-400 leading-relaxed">
                From custom software & mobile app development to stunning websites for 
                every industry — schools, hospitals, hotels, real estate, law firms, 
                NGOs, and more. We also provide intelligent automation, video production, 
                and comprehensive digital marketing solutions.
              </p>
              
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all"
                  >
                    <div className="text-3xl font-heading font-bold gradient-text">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right - Values */}
          <StaggerChildren className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <GlassCard className="h-full">
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                    >
                      <value.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h4 className="text-lg font-heading font-semibold text-white">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={0.2}>
            <GlassCard className="h-full">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center flex-shrink-0">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-semibold text-white mb-2">
                    Our Mission
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    To empower businesses with innovative digital solutions that drive
                    growth, enhance efficiency, and create lasting value in an
                    ever-evolving technological landscape.
                  </p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.3}>
            <GlassCard className="h-full">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-semibold text-white mb-2">
                    Our Vision
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    To be the leading digital innovation partner, recognized globally
                    for delivering exceptional quality, creative excellence, and
                    transformative technology solutions.
                  </p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
