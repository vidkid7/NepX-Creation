"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTechnologies } from "@/hooks/useTechnologies";
import toast, { Toaster } from "react-hot-toast";

// Category definitions for UI grouping
const categoryDefinitions = [
  {
    id: "Frontend",
    label: "Frontend",
    icon: "Code2",
    gradient: "from-cyan-500 to-blue-500",
    description: "Modern frameworks for stunning user interfaces",
  },
  {
    id: "Backend",
    label: "Backend",
    icon: "Server",
    gradient: "from-green-500 to-emerald-500",
    description: "Robust server-side solutions for scalability",
  },
  {
    id: "Database",
    label: "Database",
    icon: "Database",
    gradient: "from-purple-500 to-pink-500",
    description: "Efficient data storage and management",
  },
  {
    id: "Cloud",
    label: "Cloud & DevOps",
    icon: "Cloud",
    gradient: "from-orange-500 to-amber-500",
    description: "Seamless deployment and infrastructure",
  },
  {
    id: "Mobile",
    label: "Mobile",
    icon: "Globe",
    gradient: "from-rose-500 to-red-500",
    description: "Cross-platform mobile app development",
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
  category: string;
  icon: string;
  expertise: number;
  color: string;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function TechnologiesAdminPage() {
  const { technologies, loading, createTechnology, updateTechnology, deleteTechnology, refetch } = useTechnologies();
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");
  const [isAddingTech, setIsAddingTech] = useState(false);
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [newTech, setNewTech] = useState({ name: "", icon: "⚛️", color: "#61DAFB" });

  // Filter technologies by active category
  const filteredTechnologies = technologies.filter(
    (tech) => tech.category === activeCategory
  );

  // Get category definition for the active category
  const activeCategoryDef = categoryDefinitions.find((c) => c.id === activeCategory);

  // Count technologies per category
  const getCategoryCount = (categoryId: string) => {
    return technologies.filter((t) => t.category === categoryId).length;
  };

  const handleAddTechnology = async () => {
    if (!newTech.name.trim()) {
      toast.error("Technology name is required");
      return;
    }
    if (!newTech.icon.trim()) {
      toast.error("Icon/emoji is required");
      return;
    }

    setIsSaving(true);
    try {
      await createTechnology({
        name: newTech.name.trim(),
        category: activeCategory,
        icon: newTech.icon.trim() || "⚛️",
        expertise: 80,
        color: newTech.color,
        active: true,
      });
      setNewTech({ name: "", icon: "⚛️", color: "#61DAFB" });
      setIsAddingTech(false);
    } catch (error) {
      console.error("Failed to add technology:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTechnology = async (techId: string) => {
    if (!confirm("Are you sure you want to delete this technology?")) return;

    try {
      await deleteTechnology(techId);
    } catch (error) {
      console.error("Failed to delete technology:", error);
    }
  };

  const handleUpdateTechnology = async () => {
    if (!editingTech) return;

    setIsSaving(true);
    try {
      await updateTechnology(editingTech.id, {
        name: editingTech.name,
        category: editingTech.category,
        icon: editingTech.icon,
        expertise: editingTech.expertise,
        color: editingTech.color,
        active: editingTech.active,
      });
      setEditingTech(null);
    } catch (error) {
      console.error("Failed to update technology:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

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
          leftIcon={loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          onClick={() => refetch()}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categoryDefinitions.map((cat) => {
          const IconComponent =
            iconOptions.find((i) => i.value === cat.icon)?.icon || Code2;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeCategory === cat.id
                ? `bg-gradient-to-r ${cat.gradient} text-white`
                : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
            >
              <IconComponent size={16} />
              <span>{cat.label}</span>
              <span className="text-xs opacity-70">
                ({getCategoryCount(cat.id)})
              </span>
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Active Category Management */}
      {!loading && activeCategoryDef && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Category Info */}
          <GlassCard>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-heading font-semibold text-white">
                Category Info
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500">Label</span>
                <p className="text-white">{activeCategoryDef.label}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Description</span>
                <p className="text-gray-400 text-sm">
                  {activeCategoryDef.description}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Gradient</span>
                <div
                  className={`mt-1 h-6 rounded-lg bg-gradient-to-r ${activeCategoryDef.gradient}`}
                />
              </div>
              <div>
                <span className="text-xs text-gray-500">Technologies Count</span>
                <p className="text-white text-2xl font-bold">{filteredTechnologies.length}</p>
              </div>
            </div>
          </GlassCard>

          {/* Technologies List */}
          <div className="lg:col-span-2">
            <GlassCard>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-heading font-semibold text-white">
                  Technologies ({filteredTechnologies.length})
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
                          Color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={newTech.color}
                            onChange={(e) =>
                              setNewTech({ ...newTech, color: e.target.value })
                            }
                            className="w-12 h-11 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                          />
                          <Input
                            placeholder="#61DAFB"
                            value={newTech.color}
                            onChange={(e) =>
                              setNewTech({ ...newTech, color: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="primary"
                        onClick={handleAddTechnology}
                        disabled={isSaving}
                        leftIcon={isSaving ? <Loader2 size={16} className="animate-spin" /> : undefined}
                      >
                        {isSaving ? "Adding..." : "Add"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsAddingTech(false)}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Technologies Grid */}
              {filteredTechnologies.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No technologies in this category. Click "Add Technology" to create one.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {filteredTechnologies.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      {editingTech?.id === tech.id ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editingTech.name}
                            onChange={(e) =>
                              setEditingTech({
                                ...editingTech,
                                name: e.target.value,
                              })
                            }
                            className="flex-1 px-2 py-1 rounded bg-white/10 text-white"
                          />
                          <input
                            type="color"
                            value={editingTech.color}
                            onChange={(e) =>
                              setEditingTech({
                                ...editingTech,
                                color: e.target.value,
                              })
                            }
                            className="w-8 h-8 rounded cursor-pointer"
                          />
                          <button
                            onClick={handleUpdateTechnology}
                            disabled={isSaving}
                            className="p-1 text-green-400 hover:text-green-300"
                          >
                            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
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
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: tech.color + "20" }}
                            >
                              <span className="text-lg" style={{ color: tech.color }}>
                                {tech.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <span className="text-white font-medium">
                                {tech.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: tech.color }}
                                />
                                <span className="text-xs text-gray-500">{tech.color}</span>
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
              )}
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
