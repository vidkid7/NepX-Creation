"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Github,
  X,
  Save,
  Star,
  Upload,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const categories = ["All", "Web", "Mobile", "Software", "Marketing"];

// Mock data
const initialProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with advanced inventory management and payment integration.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop",
    category: "Web",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    link: "https://example.com",
    github: "https://github.com",
    featured: true,
    active: true,
  },
  {
    id: "2",
    title: "Healthcare Mobile App",
    description: "Patient management and telemedicine application with real-time video consultations.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    category: "Mobile",
    technologies: ["React Native", "Firebase", "WebRTC"],
    link: "",
    github: "",
    featured: true,
    active: true,
  },
  {
    id: "3",
    title: "Enterprise CRM System",
    description: "Custom CRM with AI-powered analytics, automation workflows, and team collaboration tools.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    category: "Software",
    technologies: ["React", "Python", "TensorFlow", "AWS"],
    link: "",
    github: "",
    featured: false,
    active: true,
  },
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<typeof initialProjects[0] | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "Web",
    technologies: [""],
    link: "",
    github: "",
    featured: false,
    active: true,
  });

  const filteredProjects = filterCategory === "All"
    ? projects
    : projects.filter((p) => p.category === filterCategory);

  const handleEdit = (project: typeof initialProjects[0]) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
      technologies: project.technologies,
      link: project.link || "",
      github: project.github || "",
      featured: project.featured,
      active: project.active,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      category: "Web",
      technologies: [""],
      link: "",
      github: "",
      featured: false,
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingProject) {
      setProjects(projects.map((p) =>
        p.id === editingProject.id ? { ...p, ...formData } : p
      ));
    } else {
      setProjects([...projects, { id: Date.now().toString(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const addTechnology = () => {
    setFormData({ ...formData, technologies: [...formData.technologies, ""] });
  };

  const updateTechnology = (index: number, value: string) => {
    const newTech = [...formData.technologies];
    newTech[index] = value;
    setFormData({ ...formData, technologies: newTech });
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Portfolio</h1>
          <p className="text-gray-400">Manage your project showcase</p>
        </div>
        <Button onClick={handleAdd} leftIcon={<Plus size={18} />}>
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterCategory === cat
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="overflow-hidden">
              {/* Image */}
              <div className="relative h-40 -mx-6 -mt-6 mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                {project.featured && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-amber-500/80 backdrop-blur-sm flex items-center gap-1">
                    <Star size={12} className="fill-white text-white" />
                    <span className="text-xs font-medium text-white">Featured</span>
                  </div>
                )}
                <span className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-xs text-white">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-heading font-semibold text-white">
                    {project.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      project.active
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {project.active ? "Active" : "Hidden"}
                  </span>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-gray-500"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-gray-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-primary hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <GlassCard>
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-white">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project title"
                  />

                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Project description"
                  />

                  {/* Image URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Image</label>
                    <div className="flex gap-2">
                      <Input
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Image URL"
                        className="flex-1"
                      />
                      <button className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 transition-colors">
                        <Upload size={20} />
                      </button>
                    </div>
                    {formData.image && (
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={formData.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(1).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.category === cat
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Technologies</label>
                    {formData.technologies.map((tech, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={tech}
                          onChange={(e) => updateTechnology(index, e.target.value)}
                          placeholder="Technology name"
                        />
                        <button
                          onClick={() => removeTechnology(index)}
                          className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addTechnology}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      + Add Technology
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Live URL"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="https://example.com"
                    />
                    <Input
                      label="GitHub URL"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          formData.featured ? "bg-amber-500" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            formData.featured ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                      <span className="text-sm text-gray-300">Featured</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setFormData({ ...formData, active: !formData.active })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          formData.active ? "bg-primary" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            formData.active ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                      <span className="text-sm text-gray-300">Active</span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} leftIcon={<Save size={18} />}>
                    Save Project
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
