"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Code,
  Database,
  Globe,
  Smartphone,
  Server,
  Cloud,
  Shield,
  Brain,
  Palette,
  Terminal,
  GitBranch,
  Layers,
  X,
  Save,
  Clock,
  BookOpen,
  Users,
  Award,
  Monitor,
  MapPin,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const iconOptions = [
  { name: "Code", icon: Code },
  { name: "Database", icon: Database },
  { name: "Globe", icon: Globe },
  { name: "Smartphone", icon: Smartphone },
  { name: "Server", icon: Server },
  { name: "Cloud", icon: Cloud },
  { name: "Shield", icon: Shield },
  { name: "Brain", icon: Brain },
  { name: "Palette", icon: Palette },
  { name: "Terminal", icon: Terminal },
  { name: "GitBranch", icon: GitBranch },
  { name: "Layers", icon: Layers },
];

const gradientOptions = [
  { name: "Blue Cyan", value: "from-cyan-500 to-blue-600" },
  { name: "Yellow Green", value: "from-yellow-500 to-green-500" },
  { name: "Orange Red", value: "from-orange-500 to-red-500" },
  { name: "Blue Purple", value: "from-blue-500 to-purple-600" },
  { name: "Red Orange", value: "from-red-500 to-orange-500" },
  { name: "Purple Indigo", value: "from-purple-500 to-indigo-600" },
  { name: "Pink Rose", value: "from-pink-500 to-rose-500" },
  { name: "Green Emerald", value: "from-green-500 to-emerald-600" },
  { name: "Violet Purple", value: "from-violet-500 to-purple-600" },
  { name: "Gray Dark", value: "from-gray-600 to-gray-800" },
  { name: "Blue Light", value: "from-blue-400 to-cyan-500" },
];

const categoryOptions = [
  "Web Development",
  "Mobile Development",
  "Database",
  "DevOps & Cloud",
  "Programming",
  "Design",
  "Data Science",
];

const levelOptions = ["Beginner", "Intermediate", "Advanced", "All Levels"];

const modeOptions = ["Online", "Offline", "Hybrid"];

// Mock data - in production, fetch from API
const initialCourses = [
  {
    id: "1",
    title: "MERN Stack Development",
    shortDescription: "Master MongoDB, Express.js, React, and Node.js to build modern full-stack web applications.",
    icon: "Code",
    gradient: "from-cyan-500 to-blue-600",
    duration: "4 Months",
    level: "Beginner",
    mode: ["Online", "Offline", "Hybrid"],
    priceOnline: 15000,
    priceOffline: 20000,
    category: "Web Development",
    projects: 8,
    popular: true,
    active: true,
  },
  {
    id: "2",
    title: "Python Programming",
    shortDescription: "Learn Python from scratch with hands-on projects in web development, automation, and data analysis.",
    icon: "Terminal",
    gradient: "from-yellow-500 to-green-500",
    duration: "3 Months",
    level: "Beginner",
    mode: ["Online", "Offline", "Hybrid"],
    priceOnline: 10000,
    priceOffline: 14000,
    category: "Programming",
    projects: 6,
    popular: true,
    active: true,
  },
  {
    id: "3",
    title: "SQL & Database Management",
    shortDescription: "Master SQL queries, database design, and management with MySQL, PostgreSQL, and MongoDB.",
    icon: "Database",
    gradient: "from-orange-500 to-red-500",
    duration: "2.5 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    priceOnline: 8000,
    priceOffline: 11000,
    category: "Database",
    projects: 5,
    popular: true,
    active: true,
  },
];

type Course = typeof initialCourses[0];

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    icon: "Code",
    gradient: "from-cyan-500 to-blue-600",
    duration: "",
    level: "Beginner",
    mode: ["Online"] as string[],
    priceOnline: 0,
    priceOffline: 0,
    category: "Web Development",
    projects: 0,
    popular: false,
    active: true,
  });

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      shortDescription: course.shortDescription,
      icon: course.icon,
      gradient: course.gradient,
      duration: course.duration,
      level: course.level,
      mode: course.mode,
      priceOnline: course.priceOnline,
      priceOffline: course.priceOffline,
      category: course.category,
      projects: course.projects,
      popular: course.popular,
      active: course.active,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      shortDescription: "",
      icon: "Code",
      gradient: "from-cyan-500 to-blue-600",
      duration: "",
      level: "Beginner",
      mode: ["Online"],
      priceOnline: 0,
      priceOffline: 0,
      category: "Web Development",
      projects: 0,
      popular: false,
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id ? { ...c, ...formData } : c
        )
      );
    } else {
      setCourses([...courses, { id: Date.now().toString(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const toggleMode = (mode: string) => {
    const currentModes = formData.mode;
    if (currentModes.includes(mode)) {
      setFormData({
        ...formData,
        mode: currentModes.filter((m) => m !== mode),
      });
    } else {
      setFormData({
        ...formData,
        mode: [...currentModes, mode],
      });
    }
  };

  const getIcon = (iconName: string) => {
    const found = iconOptions.find((i) => i.name === iconName);
    return found ? found.icon : Code;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Courses</h1>
          <p className="text-gray-400">Manage IT training courses for students</p>
        </div>
        <Button onClick={handleAdd} leftIcon={<Plus size={18} />}>
          Add Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Courses", value: courses.length, icon: BookOpen },
          { label: "Active Courses", value: courses.filter((c) => c.active).length, icon: Award },
          { label: "Popular Courses", value: courses.filter((c) => c.popular).length, icon: Users },
          { label: "Categories", value: new Set(courses.map((c) => c.category)).size, icon: Layers },
        ].map((stat, index) => (
          <GlassCard key={index} tilt3D={false}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Courses List */}
      <div className="grid gap-4">
        {courses.map((course, index) => {
          const IconComponent = getIcon(course.icon);
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard tilt3D={false} className="flex items-start gap-4">
                {/* Drag Handle */}
                <button className="p-2 text-gray-500 hover:text-gray-300 cursor-grab">
                  <GripVertical size={20} />
                </button>

                {/* Icon */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${course.gradient}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-heading font-semibold text-white">
                          {course.title}
                        </h3>
                        {course.popular && (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                        {course.shortDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {course.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock className="w-4 h-4 text-primary" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <BookOpen className="w-4 h-4 text-primary" />
                      {course.projects} Projects
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Users className="w-4 h-4 text-primary" />
                      {course.level}
                    </div>
                    <div className="text-primary font-medium">
                      NPR {course.priceOnline.toLocaleString()} Online
                    </div>
                  </div>

                  {/* Mode & Category Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 rounded-md bg-accent/20 text-xs text-accent">
                      {course.category}
                    </span>
                    {course.mode.map((mode) => (
                      <span
                        key={mode}
                        className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400 flex items-center gap-1"
                      >
                        {mode === "Online" && <Monitor className="w-3 h-3" />}
                        {mode === "Offline" && <MapPin className="w-3 h-3" />}
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
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
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <GlassCard tilt3D={false}>
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-white">
                    {editingCourse ? "Edit Course" : "Add New Course"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Course Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., MERN Stack Development"
                    />
                    <Input
                      label="Duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 4 Months"
                    />
                  </div>

                  <Textarea
                    label="Short Description"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief description of the course"
                  />

                  {/* Category & Level */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                      >
                        {categoryOptions.map((cat) => (
                          <option key={cat} value={cat} className="bg-dark-100">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Level</label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                      >
                        {levelOptions.map((level) => (
                          <option key={level} value={level} className="bg-dark-100">
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

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
                          <option.icon
                            size={20}
                            className={formData.icon === option.name ? "text-primary" : "text-gray-400"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gradient Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Color Theme</label>
                    <div className="grid grid-cols-4 gap-2">
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
                          <span className="text-xs text-gray-300 truncate">{option.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mode Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Learning Modes</label>
                    <div className="flex gap-2">
                      {modeOptions.map((mode) => (
                        <button
                          key={mode}
                          onClick={() => toggleMode(mode)}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                            formData.mode.includes(mode)
                              ? "bg-primary/20 border border-primary/50 text-primary"
                              : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          {mode === "Online" && <Monitor size={16} />}
                          {mode === "Offline" && <MapPin size={16} />}
                          {mode === "Hybrid" && <Users size={16} />}
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Online Price (NPR)"
                      type="number"
                      value={formData.priceOnline}
                      onChange={(e) => setFormData({ ...formData, priceOnline: parseInt(e.target.value) || 0 })}
                      placeholder="15000"
                    />
                    <Input
                      label="Offline Price (NPR)"
                      type="number"
                      value={formData.priceOffline}
                      onChange={(e) => setFormData({ ...formData, priceOffline: parseInt(e.target.value) || 0 })}
                      placeholder="20000"
                    />
                    <Input
                      label="Number of Projects"
                      type="number"
                      value={formData.projects}
                      onChange={(e) => setFormData({ ...formData, projects: parseInt(e.target.value) || 0 })}
                      placeholder="8"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setFormData({ ...formData, popular: !formData.popular })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          formData.popular ? "bg-yellow-500" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            formData.popular ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                      <span className="text-sm text-gray-300">Mark as Popular</span>
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
                    Save Course
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
