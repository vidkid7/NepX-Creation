"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, X, Save } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

// Mock data
const initialTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
    quote: "NepX Creation transformed our entire digital presence. Their attention to detail and innovative approach exceeded our expectations.",
    rating: 5,
    active: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "DataFlow Systems",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    quote: "Working with NepX was an absolute pleasure. They built a complex enterprise system that streamlined our operations significantly.",
    rating: 5,
    active: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthHub",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop",
    quote: "The digital marketing campaign NepX created for us was phenomenal. Our social media engagement tripled!",
    rating: 5,
    active: true,
  },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<typeof initialTestimonials[0] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    image: "",
    quote: "",
    rating: 5,
    active: true,
  });

  const handleEdit = (testimonial: typeof initialTestimonials[0]) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      image: testimonial.image,
      quote: testimonial.quote,
      rating: testimonial.rating,
      active: testimonial.active,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      image: "",
      quote: "",
      rating: 5,
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingTestimonial) {
      setTestimonials(testimonials.map((t) =>
        t.id === editingTestimonial.id ? { ...t, ...formData } : t
      ));
    } else {
      setTestimonials([...testimonials, { id: Date.now().toString(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Testimonials</h1>
          <p className="text-gray-400">Manage client testimonials and reviews</p>
        </div>
        <Button onClick={handleAdd} leftIcon={<Plus size={18} />}>
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard>
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-white truncate">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    testimonial.active
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {testimonial.active ? "Active" : "Hidden"}
                </span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < testimonial.rating
                        ? "fill-primary text-primary"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
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
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <GlassCard>
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-white">
                    {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
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
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                    <Input
                      label="Role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="CEO"
                    />
                  </div>

                  <Input
                    label="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                  />

                  <Input
                    label="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />

                  <Textarea
                    label="Quote"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="What the client said..."
                  />

                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-2"
                        >
                          <Star
                            size={24}
                            className={
                              star <= formData.rating
                                ? "fill-primary text-primary"
                                : "text-gray-600 hover:text-gray-400"
                            }
                          />
                        </button>
                      ))}
                    </div>
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
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} leftIcon={<Save size={18} />}>
                    Save Testimonial
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
