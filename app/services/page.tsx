"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/animations/ParticleBackground";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";
import { mainServices, industryServices } from "@/lib/services-data";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-primary/10" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[200px] opacity-20" />

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Comprehensive{" "}
                <span className="gradient-text">Digital Solutions</span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                From custom software development to stunning websites, mobile apps to 
                digital marketing — we provide end-to-end solutions to transform your 
                business and drive growth.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 relative">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainServices.map((service) => (
              <StaggerItem key={service.id}>
                <Link href={`/services/${service.id}`}>
                  <GlassCard className="h-full group cursor-pointer">
                    <div className="space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5`}
                      >
                        <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center">
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>

                      <h3 className="text-xl font-heading font-semibold text-white group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2">
                        {service.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
                        <span>Learn More</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Industry Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Tailored for Every Industry
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We understand that each industry has unique challenges. Our specialized 
                solutions are designed to address the specific needs of your sector.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryServices.map((industry, index) => (
              <FadeIn key={industry.title} delay={index * 0.1}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <industry.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-heading font-semibold text-white">
                      {industry.title}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {industry.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Website Types */}
      <section className="py-16 relative">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-green-400 bg-green-400/10 rounded-full border border-green-400/20">
                Website Development
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Websites for Every Purpose
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Whatever your business type, we have the expertise to create a 
                website that perfectly represents your brand and achieves your goals.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Schools & Colleges",
              "Education Consultancy",
              "Hospitals & Clinics",
              "Dental Practices",
              "Restaurants & Cafes",
              "Hotels & Resorts",
              "Gyms & Fitness",
              "Salons & Spas",
              "Real Estate",
              "Construction",
              "Travel Agencies",
              "Trekking Companies",
              "Doctors",
              "Lawyers & Law Firms",
              "Chartered Accountants",
              "Engineers & Architects",
              "Coaches & Trainers",
              "Consultants",
              "Startups",
              "E-commerce Stores",
              "Service Businesses",
              "Landing Pages",
              "NGOs & INGOs",
              "Foundations & Trusts",
              "CSR Initiatives",
              "Portfolios",
              "Freelancers",
              "Photographers",
              "Designers",
              "Bloggers",
              "Content Creators",
              "And More...",
            ].map((type, index) => (
              <FadeIn key={type} delay={index * 0.02}>
                <div className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-primary/20 transition-all text-center">
                  <span className="text-sm text-gray-400">{type}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-white/10 text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Get a free consultation and custom quote for your project. 
                Let&apos;s turn your vision into reality.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl hover:shadow-glow-lg transition-all"
              >
                <span>Get Started Today</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
