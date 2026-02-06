"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Code,
  Globe,
  Zap,
  Video,
  TrendingUp,
  Lightbulb,
  X,
  Save,
  Loader2,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useServices } from "@/hooks/useServices";
import toast, { Toaster } from "react-hot-toast";

const iconOptions = [
  { name: "Code", icon: Code },
  { name: "Globe", icon: Globe },
  { name: "Zap", icon: Zap },
  { name: "Video", icon: Video },
  { name: "TrendingUp", icon: TrendingUp },
  { name: "Lightbulb", icon: Lightbulb },
];

const gradientOptions = [
  { name: "Blue Cyan", value: "from-blue-500 to-cyan-500" },
  { name: "Purple Pink", value: "from-purple-500 to-pink-500" },
  { name: "Amber Orange", value: "from-amber-500 to-orange-500" },
  { name: "Red Rose", value: "from-red-500 to-rose-500" },
  { name: "Green Emerald", value: "from-green-500 to-emerald-500" },
  { name: "Violet Purple", value: "from-violet-500 to-purple-500" },
];

export default function ServicesPage() {
  const { services, loading, createService, updateService, deleteService } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<typeof services[0] | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Code",
    gradient: "from-blue-500 to-cyan-500",
    features: [""],
    active: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (service: typeof services[0]) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      gradient: service.gradient,
      features: service.features,
      active: service.active,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      icon: "Code",
      gradient: "from-blue-500 to-cyan-500",
      features: [""],
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    // Validate form
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (formData.features.filter(f => f.trim()).length === 0) {
      toast.error("At least one feature is required");
      return;
    }

    setIsSaving(true);

    try {
      // Filter out empty features
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim()),
      };

      if (editingService) {
        await updateService(editingService.id, cleanedData);
      } else {
        await createService(cleanedData);
      }
      
      setIsModalOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const getIcon = (iconName: string) => {
    const found = iconOptions.find((i) => i.name === iconName);
    return found ? found.icon : Code;
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Services</h1>
          <p className="text-gray-400">Manage the services displayed on your website</p>
        </div>
        <Button onClick={handleAdd} leftIcon={<Plus size={18} />} disabled={loading}>
          Add Service
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Services Grid */}
      {!loading && (
        <div className="grid gap-4">
          {services.length === 0 ? (
            <GlassCard className="text-center py-12">
              <p className="text-gray-400">No services found. Create your first service to get started.</p>
            </GlassCard>
          ) : (
            services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="flex items-start gap-4">
                {/* Drag Handle */}
                <button className="p-2 text-gray-500 hover:text-gray-300 cursor-grab">
                  <GripVertical size={20} />
                </button>

                {/* Icon */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-20`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          service.active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {service.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                </GlassCard>
              </motion.div>
            );
          })
          )}
        </div>
      )}

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
                    {editingService ? "Edit Service" : "Add New Service"}
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
                    placeholder="Service title"
                  />

                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Service description"
                  />

                  {/* Icon Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Icon</label>
                    <div className="grid grid-cols-6 gap-2">
                      {iconOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => setFormData({ ...formData, icon: option.name })}
                          className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                            formData.icon === option.name
                              ? "bg-primary/20 border border-primary/50"
                              : "bg-white/5 border border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <option.icon size={20} className={formData.icon === option.name ? "text-primary" : "text-gray-400"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gradient Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Color Theme</label>
                    <div className="grid grid-cols-3 gap-2">
                      {gradientOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({ ...formData, gradient: option.value })}
                          className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
                            formData.gradient === option.value
                              ? "bg-primary/20 border border-primary/50"
                              : "bg-white/5 border border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${option.value}`} />
                          <span className="text-sm text-gray-300">{option.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Features</label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder="Feature name"
                        />
                        <button
                          onClick={() => removeFeature(index)}
                          className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addFeature}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      + Add Feature
                    </button>
                  </div>

                  {/* Active Toggle */}
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

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    leftIcon={isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Service"}
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
