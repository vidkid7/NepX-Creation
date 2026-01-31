"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
    quote:
      "NepX Creation transformed our entire digital presence. Their attention to detail and innovative approach exceeded our expectations. The team delivered a stunning website that increased our conversions by 200%.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "DataFlow Systems",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    quote:
      "Working with NepX was an absolute pleasure. They built a complex enterprise system that streamlined our operations significantly. Their technical expertise and professionalism are unmatched.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthHub",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop",
    quote:
      "The digital marketing campaign NepX created for us was phenomenal. Our social media engagement tripled, and we saw a 150% increase in qualified leads. Highly recommended!",
    rating: 5,
  },
  {
    id: 4,
    name: "David Park",
    role: "Founder",
    company: "InnovateTech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop",
    quote:
      "NepX Creation delivered our mobile app on time and beyond our expectations. The UI/UX design is beautiful, and the app performance is outstanding. They're now our go-to tech partner.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      </div>
    </section>
  );
}
