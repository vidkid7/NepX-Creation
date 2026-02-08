import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import CTASection from "@/components/sections/CTASection";
import CoursesSection from "@/components/sections/CoursesSection";
import ParticleBackground from "@/components/animations/ParticleBackground";

export default function Home() {
  return (
    <>
      {/* Navigation - Sticky at top */}
      <Navbar />
      
      <main className="relative min-h-screen overflow-hidden">
        {/* Background Effects */}
        <ParticleBackground />
        
        {/* Main Content */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CoursesSection />
        <PortfolioSection />
        <WhyChooseUsSection />
        <TechnologiesSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
        
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
