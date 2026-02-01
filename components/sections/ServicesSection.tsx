"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import FadeIn from "@/components/animations/FadeIn";
import { mainServices, industryServices } from "@/lib/services-data";

// Service card component with 3D effects
function ServiceCard({ service }: { service: typeof mainServices[0] }) {
  return (
    <Link href={`/services/${service.id}`}>
      <GlassCard tilt3D={true} className="h-full cursor-pointer group">
        <div className="space-y-4">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5`}
          >
            <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center">
              <service.icon className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-heading font-semibold text-white group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2">
            {service.features.slice(0, 4).map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                {feature}
              </li>
            ))}
            {service.features.length > 4 && (
              <li className="text-sm text-gray-600">
                +{service.features.length - 4} more
              </li>
            )}
          </ul>

          {/* Learn more link */}
          <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
            <span>View Details</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

// Industry card component with 3D effects
function IndustryCard({ industry }: { industry: typeof industryServices[0] }) {
  return (
    <GlassCard tilt3D={true} className="group">
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all"
        >
          <industry.icon className="w-5 h-5 text-primary" />
        </motion.div>
        <h4 className="font-heading font-semibold text-white text-sm group-hover:text-primary transition-colors">
          {industry.title}
        </h4>
      </div>
      <ul className="space-y-2">
        {industry.items.map((item, i) => (
          <li key={i} className="text-xs text-gray-500 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary/50" />
            {item}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px] -translate-y-1/2" />

      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          label="Our Services"
          title="Comprehensive Digital Solutions"
          description="We offer a full spectrum of IT and digital services to help your business thrive in the digital age."
        />

        {/* Main Services Grid */}
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {mainServices.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Industry-Specific Solutions */}
        <div className="mb-16">
          <FadeIn>
            <div className="text-center mb-12">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:border-accent/40 transition-colors cursor-default"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Industry Solutions
              </motion.span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Tailored for Every Industry
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We create specialized digital solutions for businesses across all industries,
                understanding the unique needs and challenges of each sector.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industryServices.map((industry, index) => (
              <FadeIn key={industry.title} delay={index * 0.05}>
                <IndustryCard industry={industry} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="relative text-center p-8 rounded-2xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
            <div className="absolute inset-0 border border-white/5 rounded-2xl" />

            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">
                Don&apos;t See Your Industry?
              </h3>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                We create custom solutions for any business type. Contact us to discuss
                your specific requirements and let&apos;s build something amazing together.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl hover:shadow-glow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Get Custom Quote</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
