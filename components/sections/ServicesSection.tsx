"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import FadeIn from "@/components/animations/FadeIn";
import { mainServices, industryServices } from "@/lib/services-data";

export default function ServicesSection() {
  return (
    <section id="services" className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px] -translate-y-1/2" />

      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          label="Our Services"
          title="Comprehensive Digital Solutions"
          description="We offer a full spectrum of IT and digital services to help your business thrive in the digital age."
        />

        {/* Main Services Grid */}
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {mainServices.map((service, index) => (
            <StaggerItem key={service.id}>
              <Link href={`/services/${service.id}`}>
                <GlassCard className="h-full group cursor-pointer">
                  <div className="space-y-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5`}
                    >
                      <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center">
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-semibold text-white group-hover:text-primary transition-colors">
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
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Industry-Specific Solutions */}
        <div className="mb-16">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Industry Solutions
              </span>
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
              <FadeIn key={industry.title} delay={index * 0.1}>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <industry.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-heading font-semibold text-white text-sm">
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
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-white/5">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">
              Don&apos;t See Your Industry?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              We create custom solutions for any business type. Contact us to discuss 
              your specific requirements and let&apos;s build something amazing together.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl hover:shadow-glow-lg transition-all"
            >
              <span>Get Custom Quote</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
