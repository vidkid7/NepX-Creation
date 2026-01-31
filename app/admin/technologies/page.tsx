"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Code2,
  Server,
  Database,
  Cloud,
  Globe,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Mock data - in production, this would come from the database
const initialCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "Code2",
    gradient: "from-cyan-500 to-blue-500",
    description: "Modern frameworks for stunning user interfaces",
    technologies: [
      { id: "1", name: "React", icon: "⚛️", expertise: 95 },
      { id: "2", name: "Next.js", icon: "▲", expertise: 90 },
      { id: "3", name: "Vue.js", icon: "💚", expertise: 85 },
      { id: "4", name: "TypeScript", icon: "📘", expertise: 92 },
      { id: "5", name: "Tailwind CSS", icon: "🎨", expertise: 95 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "Server",
    gradient: "from-green-500 to-emerald-500",
    description: "Robust server-side solutions for scalability",
    technologies: [
      { id: "6", name: "Node.js", icon: "🟢", expertise: 95 },
      { id: "7", name: "Python", icon: "🐍", expertise: 90 },
      { id: "8", name: "Go", icon: "🔷", expertise: 80 },
      { id: "9", name: "PHP/Laravel", icon: "🐘", expertise: 85 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "Database",
    gradient: "from-purple-500 to-pink-500",
    description: "Efficient data storage and management",
    technologies: [
      { id: "10", name: "PostgreSQL", icon: "🐘", expertise: 92 },
      { id: "11", name: "MongoDB", icon: "🍃", expertise: 90 },
      { id: "12", name: "Redis", icon: "🔴", expertise: 85 },
      { id: "13", name: "MySQL", icon: "🐬", expertise: 88 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: "Cloud",
    gradient: "from-orange-500 to-amber-500",
    description: "Seamless deployment and infrastructure",
    technologies: [
      { id: "14", name: "AWS", icon: "☁️", expertise: 88 },
      { id: "15", name: "Google Cloud", icon: "🌐", expertise: 85 },
      { id: "16", name: "Vercel", icon: "▲", expertise: 95 },
      { id: "17", name: "Docker", icon: "🐳", expertise: 90 },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "Globe",
    gradient: "from-rose-500 to-red-500",
    description: "Cross-platform mobile app development",
    technologies: [
      { id: "18", name: "React Native", icon: "📱", expertise: 92 },
      { id: "19", name: "Flutter", icon: "💙", expertise: 85 },
      { id: "20", name: "iOS/Swift", icon: "🍎", expertise: 80 },
    ],
  },
];

const iconOptions = [
  { value: "Code2", icon: Code2 },
  { value: "Server", icon: Server },
  { value: "Database", icon: Database },
  { value: "Cloud", icon: Cloud },
  { value: "Globe", icon: Globe },
];

const gradientOptions = [
  { value: "from-cyan-500 to-blue-500", label: "Cyan to Blue" },
  { value: "from-green-500 to-emerald-500", label: "Green to Emerald" },
  { value: "from-purple-500 to-pink-500", label: "Purple to Pink" },
  { value: "from-orange-500 to-amber-500", label: "Orange to Amber" },
  { value: "from-rose-500 to-red-500", label: "Rose to Red" },
  { value: "from-violet-500 to-purple-500", label: "Violet to Purple" },
];

interface Technology {
  id: string;
  name: string;
  icon: string;
  expertise: number;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  gradient: string;
  description: string;
  technologies: Technology[];
}

export default function TechnologiesAdminPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const [isAddingTech, setIsAddingTech] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingTech, setEditingTech] = useState<Technology | null>(null);

  const [newTech, setNewTech] = useState({ name: "", icon: "", expertise: 80 });
  const [categoryEdit, setCategoryEdit] = useState({
    label: "",
    description: "",
    gradient: "",
  });

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  const handleAddTechnology = () => {
    if (!newTech.name || !newTech.icon) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === activeCategory
          ? {
              ...cat,
              technologies: [
                ...cat.technologies,
                {
                  id: Date.now().toString(),
                  name: newTech.name,
                  icon: newTech.icon,
                  expertise: newTech.expertise,
                },
              ],
            }
          : cat
      )
    );

    setNewTech({ name: "", icon: "", expertise: 80 });
    setIsAddingTech(false);
  };

  const handleDeleteTechnology = (techId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === activeCategory
          ? {
              ...cat,
              technologies: cat.technologies.filter((t) => t.id !== techId),
            }
          : cat
      )
    );
  };

  const handleUpdateTechnology = () => {
    if (!editingTech) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === activeCategory
          ? {
              ...cat,
              technologies: cat.technologies.map((t) =>
                t.id === editingTech.id ? editingTech : t
              ),
            }
          : cat
      )
    );

    setEditingTech(null);
  };

  const handleUpdateCategory = () => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === activeCategory
          ? {
              ...cat,
              label: categoryEdit.label || cat.label,
              description: categoryEdit.description || cat.description,
              gradient: categoryEdit.gradient || cat.gradient,
            }
          : cat
      )
    );

    setIsEditingCategory(false);
  };

  const startEditCategory = () => {
    if (!activeCategoryData) return;
    setCategoryEdit({
      label: activeCategoryData.label,
      description: activeCategoryData.description,
      gradient: activeCategoryData.gradient,
    });
    setIsEditingCategory(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Technologies
          </h1>
          <p className="text-gray-400">Manage your tech stack display</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Save size={18} />}
          onClick={() => alert("Changes saved! (Mock - would save to database)")}
        >
          Save All Changes
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const IconComponent =
            iconOptions.find((i) => i.value === cat.icon)?.icon || Code2;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeCategory === cat.id
                  ? `bg-gradient-to-r ${cat.gradient} text-white`
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <IconComponent size={16} />
              <span>{cat.label}</span>
              <span className="text-xs opacity-70">
                ({cat.technologies.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Category Management */}
      {activeCategoryData && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Category Info */}
          <GlassCard>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-heading font-semibold text-white">
                Category Settings
              </h3>
              <button
                onClick={startEditCategory}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Pencil size={16} className="text-gray-400" />
              </button>
            </div>

            {isEditingCategory ? (
              <div className="space-y-4">
                <Input
                  label="Label"
                  value={categoryEdit.label}
                  onChange={(e) =>
                    setCategoryEdit({ ...categoryEdit, label: e.target.value })
                  }
                />
                <Input
                  label="Description"
                  value={categoryEdit.description}
                  onChange={(e) =>
                    setCategoryEdit({
                      ...categoryEdit,
                      description: e.target.value,
                    })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gradient
                  </label>
                  <select
                    value={categoryEdit.gradient}
                    onChange={(e) =>
                      setCategoryEdit({
                        ...categoryEdit,
                        gradient: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                  >
                    {gradientOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" onClick={handleUpdateCategory}>
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditingCategory(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-gray-500">Label</span>
                  <p className="text-white">{activeCategoryData.label}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Description</span>
                  <p className="text-gray-400 text-sm">
                    {activeCategoryData.description}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Gradient</span>
                  <div
                    className={`mt-1 h-6 rounded-lg bg-gradient-to-r ${activeCategoryData.gradient}`}
                  />
                </div>
              </div>
            )}
          </GlassCard>

          {/* Technologies List */}
          <div className="lg:col-span-2">
            <GlassCard>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-heading font-semibold text-white">
                  Technologies ({activeCategoryData.technologies.length})
                </h3>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={() => setIsAddingTech(true)}
                >
                  Add Technology
                </Button>
              </div>

              {/* Add Technology Form */}
              <AnimatePresence>
                {isAddingTech && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="grid sm:grid-cols-3 gap-4">
                      <Input
                        label="Name"
                        placeholder="e.g., React"
                        value={newTech.name}
                        onChange={(e) =>
                          setNewTech({ ...newTech, name: e.target.value })
                        }
                      />
                      <Input
                        label="Icon (Emoji)"
                        placeholder="e.g., ⚛️"
                        value={newTech.icon}
                        onChange={(e) =>
                          setNewTech({ ...newTech, icon: e.target.value })
                        }
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expertise ({newTech.expertise}%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={newTech.expertise}
                          onChange={(e) =>
                            setNewTech({
                              ...newTech,
                              expertise: parseInt(e.target.value),
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="primary" onClick={handleAddTechnology}>
                        Add
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsAddingTech(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Technologies Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {activeCategoryData.technologies.map((tech) => (
                  <div
                    key={tech.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    {editingTech?.id === tech.id ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={editingTech.icon}
                          onChange={(e) =>
                            setEditingTech({
                              ...editingTech,
                              icon: e.target.value,
                            })
                          }
                          className="w-12 px-2 py-1 rounded bg-white/10 text-center"
                        />
                        <input
                          type="text"
                          value={editingTech.name}
                          onChange={(e) =>
                            setEditingTech({
                              ...editingTech,
                              name: e.target.value,
                            })
                          }
                          className="flex-1 px-2 py-1 rounded bg-white/10"
                        />
                        <input
                          type="number"
                          value={editingTech.expertise}
                          onChange={(e) =>
                            setEditingTech({
                              ...editingTech,
                              expertise: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-16 px-2 py-1 rounded bg-white/10 text-center"
                        />
                        <button
                          onClick={handleUpdateTechnology}
                          className="p-1 text-green-400 hover:text-green-300"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={() => setEditingTech(null)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{tech.icon}</span>
                          <div>
                            <span className="text-white font-medium">
                              {tech.name}
                            </span>
                            <div className="text-xs text-gray-500">
                              {tech.expertise}% expertise
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingTech(tech)}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteTechnology(tech.id)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
