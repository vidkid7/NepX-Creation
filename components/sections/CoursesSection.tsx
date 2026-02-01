"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Users,
  Award,
  BookOpen,
  Monitor,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
  CheckCircle,
  GraduationCap,
  Phone,
  Mail,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import {
  courses,
  courseCategories,
  applicationProcess,
  classOptions,
  Course,
} from "@/lib/courses-data";

// Course Card Component with 3D effects
function CourseCard({ course }: { course: Course }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlassCard tilt3D={true} className="h-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-3 rounded-xl bg-gradient-to-br ${course.gradient}`}
          >
            <course.icon className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex items-center gap-2">
            {course.popular && (
              <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" />
                Popular
              </span>
            )}
            <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
              {course.level}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock className="w-4 h-4 text-primary" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <BookOpen className="w-4 h-4 text-primary" />
            {course.projects} Projects
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Award className="w-4 h-4 text-primary" />
            Certificate
          </div>
        </div>

        {/* Mode Tags */}
        <div className="flex flex-wrap gap-2">
          {course.mode.map((mode) => (
            <span
              key={mode}
              className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/10"
            >
              {mode === "Online" && <Monitor className="w-3 h-3 inline mr-1" />}
              {mode === "Offline" && <MapPin className="w-3 h-3 inline mr-1" />}
              {mode}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold gradient-text">
            NPR {course.price.online.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">/ Online</span>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? "Show Less" : "View Curriculum"}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/10 space-y-4">
                {/* Curriculum */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white">Curriculum</h4>
                  {course.curriculum.slice(0, 3).map((module, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-xs font-medium text-gray-300">{module.title}</p>
                      <div className="flex flex-wrap gap-1">
                        {module.topics.slice(0, 3).map((topic, i) => (
                          <span key={i} className="text-xs text-gray-500">
                            {topic}{i < 2 && ","}
                          </span>
                        ))}
                        {module.topics.length > 3 && (
                          <span className="text-xs text-gray-500">+{module.topics.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tools */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-gradient-to-r from-primary/10 to-accent/10 text-xs text-gray-300 border border-primary/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">What You Get</h4>
                  <ul className="space-y-1">
                    {course.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Enroll Now
                  </Button>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}

// Application Step Card
function ApplicationStep({ step, index }: { step: typeof applicationProcess[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <GlassCard className="text-center h-full">
        {/* Step Number */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-sm"
          >
            {step.step}
          </motion.div>
        </div>
        <div className="pt-4 space-y-3">
          <h4 className="text-lg font-heading font-semibold text-white">{step.title}</h4>
          <p className="text-sm text-gray-400">{step.description}</p>
        </div>
      </GlassCard>
      {/* Connector Line */}
      {index < applicationProcess.length - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-accent" />
      )}
    </motion.div>
  );
}

// Class Mode Card
function ClassModeCard({ mode, data }: { mode: string; data: typeof classOptions.online }) {
  return (
    <GlassCard tilt3D={true} className="h-full">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`p-3 rounded-xl ${
              mode === "online"
                ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                : mode === "offline"
                ? "bg-gradient-to-br from-green-500 to-emerald-500"
                : "bg-gradient-to-br from-purple-500 to-pink-500"
            }`}
          >
            {mode === "online" && <Monitor className="w-6 h-6 text-white" />}
            {mode === "offline" && <MapPin className="w-6 h-6 text-white" />}
            {mode === "hybrid" && <Users className="w-6 h-6 text-white" />}
          </motion.div>
          <div>
            <h4 className="text-lg font-heading font-semibold text-white">{data.title}</h4>
            <p className="text-sm text-gray-400">{data.description}</p>
          </div>
        </div>
        <ul className="space-y-2">
          {data.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
}

export default function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 6);

  return (
    <section id="courses" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px]" />

      <div className="container-custom mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          label="IT Training Courses"
          title="Launch Your Tech Career"
          description="Comprehensive IT courses designed for students and professionals. Learn from industry experts with hands-on projects and guaranteed placement support."
        />

        {/* Stats Banner */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "500+", label: "Students Trained", icon: GraduationCap },
              { value: "15+", label: "IT Courses", icon: BookOpen },
              { value: "95%", label: "Placement Rate", icon: Award },
              { value: "50+", label: "Hiring Partners", icon: Users },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {courseCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Courses Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {displayedCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More Button */}
        {filteredCourses.length > 6 && (
          <FadeIn>
            <div className="text-center mb-20">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                rightIcon={showAll ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              >
                {showAll ? "Show Less" : `View All ${filteredCourses.length} Courses`}
              </Button>
            </div>
          </FadeIn>
        )}

        {/* How to Apply Section */}
        <div className="mb-20">
          <FadeIn>
            <div className="text-center mb-12">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                How to Apply
              </motion.span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Start Your Learning Journey in 4 Simple Steps
              </h3>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-6">
            {applicationProcess.map((step, index) => (
              <ApplicationStep key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Class Options Section */}
        <div className="mb-20">
          <FadeIn>
            <div className="text-center mb-12">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
              >
                <Monitor className="w-3.5 h-3.5" />
                Learning Modes
              </motion.span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Choose Your Preferred Learning Style
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Flexibility is key to effective learning. Choose between online, offline, or hybrid modes based on your schedule and preferences.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            <ClassModeCard mode="online" data={classOptions.online} />
            <ClassModeCard mode="offline" data={classOptions.offline} />
            <ClassModeCard mode="hybrid" data={classOptions.hybrid} />
          </div>
        </div>

        {/* CTA Section */}
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Ready to Start Your IT Career?
              </h3>
              <p className="text-gray-400 mb-8">
                Get free career counseling and course guidance. Our experts will help you choose the right path based on your interests and goals.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Book Free Counseling
                </Button>
                <Button variant="outline" size="lg">
                  Download Brochure
                </Button>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <a href="tel:+9771234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  +977 123 456 7890
                </a>
                <a href="mailto:training@nepxcreation.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  training@nepxcreation.com
                </a>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
