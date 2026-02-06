"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  active: boolean;
  order: number;
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/public/testimonials');
        const data = await response.json();
        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it. Here's what our clients have to say about working with us."
        />

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {!loading && testimonials.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No testimonials available at the moment.</p>
          </div>
        )}

        {!loading && testimonials.length > 0 && (
          <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="relative">
              {/* Main Testimonial */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]"
                >
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 md:top-10 md:right-10">
                    <Quote className="w-12 h-12 text-primary/20" />
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden ring-2 ring-primary/30"
                      >
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Rating */}
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                        {Array.from({ length: testimonials[currentIndex].rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-primary text-primary"
                            />
                          )
                        )}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                        &quot;{testimonials[currentIndex].quote}&quot;
                      </blockquote>

                      {/* Author */}
                      <div>
                        <div className="text-lg font-heading font-semibold text-white">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonials[currentIndex].role} at{" "}
                          <span className="text-primary">
                            {testimonials[currentIndex].company}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prev}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary/30 transition-all"
                >
                  <ChevronLeft size={20} />
                </motion.button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-8 bg-gradient-to-r from-primary to-accent"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-primary/30 transition-all"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </FadeIn>
        </div>
        )}
      </div>
    </section>
  );
}
