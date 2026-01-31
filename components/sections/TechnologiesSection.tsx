"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Globe,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import GlassCard from "@/components/ui/GlassCard";

const techCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    gradient: "from-cyan-500 to-blue-500",
    description: "Modern frameworks for stunning user interfaces",
    technologies: [
      { name: "React", icon: "⚛️", expertise: 95 },
      { name: "Next.js", icon: "▲", expertise: 90 },
      { name: "Vue.js", icon: "💚", expertise: 85 },
      { name: "TypeScript", icon: "📘", expertise: 92 },
      { name: "Tailwind CSS", icon: "🎨", expertise: 95 },
      { name: "Framer Motion", icon: "✨", expertise: 88 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    gradient: "from-green-500 to-emerald-500",
    description: "Robust server-side solutions for scalability",
    technologies: [
      { name: "Node.js", icon: "🟢", expertise: 95 },
      { name: "Python", icon: "🐍", expertise: 90 },
      { name: "Go", icon: "🔷", expertise: 80 },
      { name: "PHP/Laravel", icon: "🐘", expertise: 85 },
      { name: "Java", icon: "☕", expertise: 75 },
      { name: "GraphQL", icon: "◈", expertise: 88 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    gradient: "from-purple-500 to-pink-500",
    description: "Efficient data storage and management",
    technologies: [
      { name: "PostgreSQL", icon: "🐘", expertise: 92 },
      { name: "MongoDB", icon: "🍃", expertise: 90 },
      { name: "Redis", icon: "🔴", expertise: 85 },
      { name: "MySQL", icon: "🐬", expertise: 88 },
      { name: "Firebase", icon: "🔥", expertise: 85 },
      { name: "Prisma", icon: "◮", expertise: 90 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: Cloud,
    gradient: "from-orange-500 to-amber-500",
    description: "Seamless deployment and infrastructure",
    technologies: [
      { name: "AWS", icon: "☁️", expertise: 88 },
      { name: "Google Cloud", icon: "🌐", expertise: 85 },
      { name: "Vercel", icon: "▲", expertise: 95 },
      { name: "Docker", icon: "🐳", expertise: 90 },
      { name: "Kubernetes", icon: "⎈", expertise: 80 },
      { name: "CI/CD", icon: "🔄", expertise: 92 },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Globe,
    gradient: "from-rose-500 to-red-500",
    description: "Cross-platform mobile app development",
    technologies: [
      { name: "React Native", icon: "📱", expertise: 92 },
      { name: "Flutter", icon: "💙", expertise: 85 },
      { name: "iOS/Swift", icon: "🍎", expertise: 80 },
      { name: "Android/Kotlin", icon: "🤖", expertise: 80 },
      { name: "Expo", icon: "📲", expertise: 88 },
      { name: "PWA", icon: "🌐", expertise: 90 },
    ],
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and performance",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Security-first development practices",
  },
  {
    icon: Rocket,
    title: "Scalable Solutions",
    description: "Built to grow with your business",
  },
  {
    icon: Sparkles,
    title: "Modern Stack",
    description: "Using latest technologies",
  },
];

export default function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const activeData = techCategories.find((cat) => cat.id === activeCategory);

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[200px] opacity-30" />

      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          label="Our Tech Stack"
          title="Built with Modern Technologies"
          description="We use cutting-edge tools and frameworks to deliver exceptional digital experiences that are fast, secure, and scalable."
        />

        {/* Category Tabs */}
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {techCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white bg-white/[0.02] border border-white/[0.05] hover:border-white/10"
                }`}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeTechTab"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.gradient}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <category.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Active Category Content */}
        <AnimatePresence mode="wait">
          {activeData && (
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-16"
            >
              <GlassCard className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left - Category Info */}
                  <div className="lg:w-1/3">
                    <div
                      className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${activeData.gradient} p-0.5 mb-4`}
                    >
                      <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center">
                        <activeData.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      {activeData.label}
                    </h3>
                    <p className="text-gray-400 mb-4">{activeData.description}</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Sparkles className="w-4 h-4" />
                      <span>{activeData.technologies.length} technologies</span>
                    </div>
                  </div>

                  {/* Right - Technologies Grid */}
                  <div className="lg:w-2/3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {activeData.technologies.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-300"
                        >
                          {/* Hover glow */}
                          <div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${activeData.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                          />

                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">{tech.icon}</span>
                              <span className="font-medium text-white">
                                {tech.name}
                              </span>
                            </div>

                            {/* Expertise bar */}
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${tech.expertise}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full rounded-full bg-gradient-to-r ${activeData.gradient}`}
                              />
                            </div>
                            <div className="mt-1 text-xs text-gray-500 text-right">
                              {tech.expertise}% expertise
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Grid */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-primary/20 transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-white mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Need a specific technology? We adapt to your requirements.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-glow-lg transition-all"
            >
              <span>Let&apos;s Discuss Your Project</span>
              <Rocket className="w-4 h-4" />
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
