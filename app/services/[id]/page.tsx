"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  MessageSquare,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/animations/ParticleBackground";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/animations/FadeIn";
import { mainServices, getServiceById } from "@/lib/services-data";

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const service = getServiceById(serviceId);

  if (!service) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold text-white mb-4">
              Service Not Found
            </h1>
            <Link href="/#services">
              <Button variant="primary">Back to Services</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Get adjacent services for navigation
  const currentIndex = mainServices.findIndex((s) => s.id === serviceId);
  const prevService = currentIndex > 0 ? mainServices[currentIndex - 1] : null;
  const nextService =
    currentIndex < mainServices.length - 1 ? mainServices[currentIndex + 1] : null;

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-black via-black to-transparent opacity-90`}
        />
        <div
          className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${service.gradient} rounded-full blur-[200px] opacity-20`}
        />

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-primary">{service.title}</span>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <FadeIn>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}
                >
                  <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                  {service.title}
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  {service.description}
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link href="#contact">
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight size={20} />}
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button variant="secondary" size="lg">
                      Request Quote
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right Content - Features */}
            <FadeIn delay={0.2} direction="right">
              <GlassCard className="p-8">
                <h3 className="text-xl font-heading font-semibold text-white mb-6">
                  What We Offer
                </h3>
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sub-Services Section */}
      {service.subServices && service.subServices.length > 0 && (
        <section className="py-16 relative">
          <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                  Specialized Solutions
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  Our {service.title} Services
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Explore our comprehensive range of {service.title.toLowerCase()} solutions 
                  tailored to meet your specific business needs.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subServices.map((subService, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <GlassCard className="h-full group">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-20 flex items-center justify-center flex-shrink-0`}
                      >
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                          {subService.title}
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {subService.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Why Choose NepX Creation?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We combine technical expertise with creative excellence to deliver 
                solutions that drive real business results.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Expert Team",
                description: "Skilled developers, designers, and strategists dedicated to your success.",
              },
              {
                title: "Quality First",
                description: "Every project meets the highest standards of quality and performance.",
              },
              {
                title: "On-Time Delivery",
                description: "We respect deadlines and deliver projects on schedule.",
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock support to keep your business running smoothly.",
              },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-heading font-semibold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-white/10 text-center">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Let&apos;s discuss your project and create something amazing together. 
                Get a free consultation and custom quote.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#contact">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight size={20} />}
                  >
                    Contact Us Now
                  </Button>
                </Link>
                <Link href="tel:+9771234567890">
                  <Button variant="secondary" size="lg">
                    Call: +977 123 456 7890
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-white/5">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {prevService ? (
              <Link
                href={`/services/${prevService.id}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="hidden sm:inline">{prevService.title}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/#services"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              All Services
            </Link>

            {nextService ? (
              <Link
                href={`/services/${nextService.id}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <span className="hidden sm:inline">{nextService.title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
