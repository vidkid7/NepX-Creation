"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

const categories = ["All", "Web", "Mobile", "Software", "Marketing"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with advanced inventory management and payment integration.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop",
    category: "Web",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    link: "#",
  },
  {
    id: 2,
    title: "Healthcare Mobile App",
    description: "Patient management and telemedicine application with real-time video consultations.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    category: "Mobile",
    technologies: ["React Native", "Firebase", "WebRTC"],
    link: "#",
  },
  {
    id: 3,
    title: "Enterprise CRM System",
    description: "Custom CRM with AI-powered analytics, automation workflows, and team collaboration tools.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    category: "Software",
    technologies: ["React", "Python", "TensorFlow", "AWS"],
    link: "#",
  },
  {
    id: 4,
    title: "FinTech Dashboard",
    description: "Real-time financial analytics dashboard with advanced charting and reporting features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    category: "Web",
    technologies: ["Vue.js", "D3.js", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    id: 5,
    title: "Social Media Campaign",
    description: "Comprehensive digital marketing campaign that increased brand engagement by 300%.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
    category: "Marketing",
    technologies: ["Analytics", "SEO", "Content Strategy"],
    link: "#",
  },
  {
    id: 6,
    title: "IoT Management Platform",
    description: "Industrial IoT platform for monitoring and managing connected devices at scale.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    category: "Software",
    technologies: ["React", "Node.js", "MQTT", "InfluxDB"],
    link: "#",
  },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="portfolio" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          label="Portfolio"
          title="Our Recent Projects"
          description="Explore our latest work showcasing innovative solutions across various industries and technologies."
        />

        {/* Category Filter */}
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.a
                      href={project.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-primary/50 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-primary/50 transition-colors"
                    >
                      <Github size={20} />
                    </motion.a>
                  </div>

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium text-white border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-heading font-semibold text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
