"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Code, Globe, Zap, Video, TrendingUp, Lightbulb, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import FadeIn from "@/components/animations/FadeIn";

// Icon mapping
const iconMap: Record<string, any> = {
  Code,
  Globe,
  Zap,
  Video,
  TrendingUp,
  Lightbulb,
};

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  active: boolean;
  order: number;
};

// Service card component with 3D effects
function ServiceCard({ service }: { service: Service }) {
  const IconComponent = iconMap[service.icon] || Code;
  
  return (
    <GlassCard tilt3D={true} className="h-full group">
      <div className="space-y-4">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5`}
        >
          <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center">
            <IconComponent className="w-7 h-7 text-white" />
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
      </div>
    </GlassCard>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/public/services');
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);
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

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {/* Main Services Grid */}
        {!loading && services.length > 0 && (
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}

        {/* No Services Message */}
        {!loading && services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No services available at the moment.</p>
          </div>
        )}

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
                Need a Custom Solution?
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
