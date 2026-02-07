"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, Loader2, Star } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useCourses } from "@/hooks/useCourses";
import toast, { Toaster } from "react-hot-toast";

type Course = {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  level: string;
  duration: string;
  projects: number;
  mode: string[];
  priceOnline: number;
  priceOffline: number | null;
  icon: string;
  gradient: string;
  curriculum: Array<{ title: string; topics: string[] }>;
  tools: string[];
  features: string[];
  popular: boolean;
  order: number;
  active: boolean;
};

const categories = ["Web Development", "Mobile Development", "Database", "Cloud & DevOps", "AI & ML", "Cybersecurity"];
const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const icons = ["Code", "Database", "Globe", "Smartphone", "Server", "Cloud", "Shield", "Brain", "Palette", "Terminal", "GitBranch", "Layers", "Cpu", "Network", "LineChart", "BookOpen"];
const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-yellow-500 to-orange-500",
  "from-indigo-500 to-purple-500",
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { getCourses, createCourse, updateCourse, deleteCourse, loading } = useCourses();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "Web Development",
    level: "Beginner",
    duration: "",
    projects: 0,
    mode: ["Online"],
    priceOnline: 0,
    priceOffline: 0,
    icon: "BookOpen",
    gradient: "from-blue-500 to-cyan-500",
    curriculum: [] as Array<{ title: string; topics: string[] }>,
    tools: [] as string[],
    features: [] as string[],
    popular: false,
    order: 0,
    active: true,
  });

  // Temporary string inputs for arrays
  const [toolsInput, setToolsInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [curriculumInput, setCurriculumInput] = useState("");

  const loadCourses = async () => {
    setIsLoading(true);
    const data = await getCourses();
    setCourses(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingCourse(null);
    setFormData({
      title: "",
      shortDescription: "",
      category: "Web Development",
      level: "Beginner",
      duration: "",
      projects: 0,
      mode: ["Online"],
      priceOnline: 0,
      priceOffline: 0,
      icon: "BookOpen",
      gradient: "from-blue-500 to-cyan-500",
      curriculum: [],
      tools: [],
      features: [],
      popular: false,
      order: 0,
      active: true,
    });
    setToolsInput("");
    setFeaturesInput("");
    setCurriculumInput("");
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsCreating(false);
    setFormData({
      title: course.title,
      shortDescription: course.shortDescription,
      category: course.category,
      level: course.level,
      duration: course.duration,
      projects: course.projects,
      mode: course.mode,
      priceOnline: course.priceOnline,
      priceOffline: course.priceOffline || 0,
      icon: course.icon,
      gradient: course.gradient,
      curriculum: course.curriculum,
      tools: course.tools,
      features: course.features,
      popular: course.popular,
      order: course.order,
      active: course.active,
    });
    setToolsInput(course.tools.join(", "));
    setFeaturesInput(course.features.join(", "));
    setCurriculumInput(JSON.stringify(course.curriculum, null, 2));
  };

  const handleSave = async () => {
    try {
      const courseData = {
        ...formData,
        tools: toolsInput.split(",").map(t => t.trim()).filter(Boolean),
        features: featuresInput.split(",").map(f => f.trim()).filter(Boolean),
        curriculum: curriculumInput ? JSON.parse(curriculumInput) : [],
      };

      if (editingCourse) {
        await updateCourse(editingCourse.id, courseData);
      } else {
        await createCourse(courseData);
      }

      setEditingCourse(null);
      setIsCreating(false);
      loadCourses();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        loadCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingCourse(null);
    setIsCreating(false);
  };

  const toggleMode = (mode: string) => {
    setFormData(prev => ({
      ...prev,
      mode: prev.mode.includes(mode)
        ? prev.mode.filter(m => m !== mode)
        : [...prev.mode, mode]
    }));
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Courses Management</h1>
          <p className="text-gray-400">Manage IT training courses</p>
        </div>
        <Button onClick={handleCreate} leftIcon={<Plus size={18} />} disabled={isCreating || editingCourse !== null}>
          Add Course
        </Button>
      </div>

      {/* Create/Edit Form */}
      <AnimatePresence>
        {(isCreating || editingCourse) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-white">
                  {editingCourse ? "Edit Course" : "Create New Course"}
                </h2>
                <button onClick={handleCancel} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Course Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Full Stack Web Development"
                    required
                  />
                  <Input
                    label="Duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="3 Months"
                    required
                  />
                </div>

                <Textarea
                  label="Short Description"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief description of the course..."
                  required
                />

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Number of Projects"
                    type="number"
                    value={formData.projects}
                    onChange={(e) => setFormData({ ...formData, projects: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Online Price (NPR)"
                    type="number"
                    value={formData.priceOnline}
                    onChange={(e) => setFormData({ ...formData, priceOnline: parseInt(e.target.value) || 0 })}
                  />
                  <Input
                    label="Offline Price (NPR)"
                    type="number"
                    value={formData.priceOffline}
                    onChange={(e) => setFormData({ ...formData, priceOffline: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mode</label>
                  <div className="flex gap-4">
                    {["Online", "Offline", "Hybrid"].map(mode => (
                      <label key={mode} className="flex items-center gap-2 text-gray-300">
                        <input
                          type="checkbox"
                          checked={formData.mode.includes(mode)}
                          onChange={() => toggleMode(mode)}
                          className="rounded"
                        />
                        {mode}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      {icons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gradient</label>
                    <select
                      value={formData.gradient}
                      onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      {gradients.map(grad => (
                        <option key={grad} value={grad}>{grad}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Input
                  label="Tools (comma-separated)"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />

                <Input
                  label="Features (comma-separated)"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Live Projects, Certificate, Job Support"
                />

                <Textarea
                  label="Curriculum (JSON format)"
                  value={curriculumInput}
                  onChange={(e) => setCurriculumInput(e.target.value)}
                  placeholder='[{"title": "Module 1", "topics": ["Topic 1", "Topic 2"]}]'
                  rows={4}
                />

                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    label="Order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />

                  <label className="flex items-center gap-2 text-gray-300 pt-8">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="rounded"
                    />
                    Popular
                  </label>

                  <label className="flex items-center gap-2 text-gray-300 pt-8">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded"
                    />
                    Active
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} isLoading={loading} leftIcon={<Save size={18} />}>
                    {editingCourse ? "Update Course" : "Create Course"}
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Courses List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <GlassCard>
          <div className="text-center py-12">
            <p className="text-gray-400">No courses yet. Create your first course!</p>
          </div>
        </GlassCard>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <GlassCard key={course.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-heading font-semibold text-white">{course.title}</h3>
                    {course.popular && (
                      <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs flex items-center gap-1">
                        <Star className="w-3 h-3" fill="currentColor" />
                        Popular
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${course.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {course.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{course.shortDescription}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>Category: {course.category}</span>
                    <span>Level: {course.level}</span>
                    <span>Duration: {course.duration}</span>
                    <span>Price: NPR {course.priceOnline.toLocaleString()}</span>
                    <span>Projects: {course.projects}</span>
                    <span>Mode: {course.mode.join(", ")}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-primary hover:bg-white/10 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
