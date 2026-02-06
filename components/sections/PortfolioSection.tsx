"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Eye, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

const categories = ["All", "Web", "Mobile", "Software", "Marketing"];

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
  githubLink?: string;
  active: boolean;
  order: number;
};

// 3D Project Card with tilt effect
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05] cursor-pointer"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          background: isHovered
            ? `conic-gradient(from 0deg at 50% 50%, 
                rgba(0, 212, 255, 0.4), 
                rgba(139, 92, 246, 0.4), 
                rgba(0, 212, 255, 0.4))`
            : "transparent",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Image */}
      <div className="relative h-56 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
        <motion.div
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
          animate={{ opacity: isHovered ? 0.9 : 0.6 }}
        />

        {/* Hover Actions */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.a
            href={project.link}
            initial={{ scale: 0, y: 20 }}
            animate={isHovered ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary/50 transition-colors"
          >
            <Eye size={22} />
          </motion.a>
          <motion.a
            href={project.link}
            initial={{ scale: 0, y: 20 }}
            animate={isHovered ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.1 }}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary/50 transition-colors"
          >
            <ExternalLink size={22} />
          </motion.a>
          <motion.a
            href="#"
            initial={{ scale: 0, y: 20 }}
            animate={isHovered ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary/50 transition-colors"
          >
            <Github size={22} />
          </motion.a>
        </motion.div>

        {/* Category Badge */}
        <motion.span
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium text-white border border-white/10"
          whileHover={{ scale: 1.05, borderColor: "rgba(0, 212, 255, 0.5)" }}
        >
          {project.category}
        </motion.span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-heading font-semibold text-white group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 212, 255, 0.1)" }}
              className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-500 border border-white/5 hover:border-primary/30 transition-all"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6), rgba(139, 92, 246, 0.6), transparent)",
          width: isHovered ? "80%" : "0%",
          transition: "width 0.4s ease",
        }}
      />
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/public/projects');
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

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
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                  activeCategory === category
                    ? "text-white"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {activeCategory === category && (
                  <>
                    <motion.span
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                    {/* Animated glow */}
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(0, 212, 255, 0.3)",
                          "0 0 30px rgba(139, 92, 246, 0.3)",
                          "0 0 20px rgba(0, 212, 255, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </>
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-400">No projects available in this category.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
