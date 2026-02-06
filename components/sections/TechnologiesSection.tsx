"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import GlassCard from "@/components/ui/GlassCard";

type Technology = {
  id: string;
  name: string;
  category: string;
  icon: string;
  expertise: number;
  active: boolean;
  order: number;
};

const techCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    gradient: "from-cyan-500 to-blue-500",
    description: "Modern frameworks for stunning user interfaces",
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    gradient: "from-green-500 to-emerald-500",
    description: "Robust server-side solutions for scalability",
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    gradient: "from-purple-500 to-pink-500",
    description: "Efficient data storage and management",
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: Cloud,
    gradient: "from-orange-500 to-amber-500",
    description: "Seamless deployment and infrastructure",
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Globe,
    gradient: "from-rose-500 to-red-500",
    description: "Cross-platform mobile app development",
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
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTechnologies() {
      try {
        const response = await fetch('/api/public/technologies');
        const data = await response.json();
        if (data.success) {
          setTechnologies(data.data);
        }
      } catch (error) {
        console.error('Error fetching technologies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTechnologies();
  }, []);

  const activeData = techCategories.find((cat) => cat.id === activeCategory);
  const activeTechnologies = technologies.filter(tech => tech.category === activeCategory);

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
                {loading && (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                )}

                {!loading && (
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
                        <span>{activeTechnologies.length} technologies</span>
                      </div>
                    </div>

                    {/* Right - Technologies Grid */}
                    <div className="lg:w-2/3">
                      {activeTechnologies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {activeTechnologies.map((tech, index) => (
                            <motion.div
                              key={tech.id}
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
                      ) : (
                        <div className="text-center py-20">
                          <p className="text-gray-400">No technologies available in this category.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
