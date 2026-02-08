"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, Globe, Zap, Video, TrendingUp, Lightbulb, Loader2, GraduationCap, Heart, Stethoscope, Utensils, Dumbbell, Building2, Plane, Scale, Calculator, Ruler, Target, Rocket, Briefcase, ShoppingCart, MousePointerClick, Building, HandHeart, Palette, UserCheck, Camera, PenTool } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

// Icon mapping
const iconMap: Record<string, any> = {
  Code, Globe, Zap, Video, TrendingUp, Lightbulb,
  GraduationCap, Heart, Stethoscope, Utensils, Dumbbell,
  Building2, Plane, Scale, Calculator, Ruler, Target,
  Rocket, Briefcase, ShoppingCart, MousePointerClick,
  Building, HandHeart, Palette, UserCheck, Camera, PenTool,
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

// Service card component with hover animations
function ServiceCard({ service }: { service: Service }) {
  const IconComponent = iconMap[service.icon] || Code;
  
  return (
    <Link href={`/services/${service.id}`} className="block h-full">
      <GlassCard tilt3D={true} className="h-full group cursor-pointer hover:border-primary/30 transition-all">
        <div className="space-y-4">
          {/* Icon with hover animation */}
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
          
          {/* View Details Link */}
          <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2 group-hover:gap-3 transition-all">
            <span>View Details</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/public/services', {
          next: { revalidate: 3600 } // Cache for 1 hour
        });
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
      {/* Simplified Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* No Services Message */}
        {!loading && services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No services available at the moment.</p>
          </div>
        )}

        {/* Enhanced CTA */}
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
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl hover:shadow-glow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Custom Quote</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
