"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, RefreshCw, Loader2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useContent } from "@/hooks/useContent";
import toast, { Toaster } from "react-hot-toast";

const tabs = [
  { id: "hero", label: "Hero Section" },
  { id: "about", label: "About Section" },
  { id: "contact", label: "Contact Info" },
];

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getContent, updateContent } = useContent();

  // Hero content state
  const [heroContent, setHeroContent] = useState({
    badge: "Premium IT Solutions",
    title: "We Build",
    titleHighlight: "Digital Excellence",
    description:
      "Transform your vision into reality with cutting-edge software development, stunning web design, and innovative digital solutions that drive business growth.",
    stats: [
      { value: "100+", label: "Projects Delivered" },
      { value: "50+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
    ],
  });

  // About content state
  const [aboutContent, setAboutContent] = useState({
    title: "Building the Future of",
    subtitle: "Digital Innovation",
    description:
      "At NepX Creation, we believe in the power of technology to transform businesses and create meaningful impact. Our team of passionate developers, designers, and digital strategists work together to deliver solutions that exceed expectations.",
    mission:
      "To empower businesses with innovative digital solutions that drive growth, enhance efficiency, and create lasting value in an ever-evolving technological landscape.",
    vision:
      "To be the leading digital innovation partner, recognized globally for delivering exceptional quality, creative excellence, and transformative technology solutions.",
    stats: [
      { number: "100+", label: "Projects Completed" },
      { number: "50+", label: "Global Clients" },
      { number: "15+", label: "Team Experts" },
      { number: "99%", label: "Client Satisfaction" },
    ],
  });

  // Contact content state
  const [contactContent, setContactContent] = useState({
    email: "hello@nepxcreation.com",
    phone: "+977 123 456 7890",
    address: "Kathmandu, Nepal",
    workingHoursWeekday: "9:00 AM - 6:00 PM",
    workingHoursSaturday: "10:00 AM - 4:00 PM",
  });

  // Load content from database on mount
  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      try {
        const [hero, about, contact] = await Promise.all([
          getContent('hero'),
          getContent('about'),
          getContent('contact'),
        ]);

        if (hero) setHeroContent(hero);
        if (about) setAboutContent(about);
        if (contact) setContactContent(contact);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [getContent]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save the content for the active tab
      if (activeTab === 'hero') {
        await updateContent('hero', heroContent);
      } else if (activeTab === 'about') {
        await updateContent('about', aboutContent);
      } else if (activeTab === 'contact') {
        await updateContent('contact', contactContent);
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateHeroStat = (index: number, field: "value" | "label", value: string) => {
    const newStats = [...heroContent.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setHeroContent({ ...heroContent, stats: newStats });
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Content Management</h1>
          <p className="text-gray-400">Edit the content displayed on your website</p>
        </div>
        <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save size={18} />} disabled={isLoading}>
          Save Changes
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <>
          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/10 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

      {/* Hero Content */}
      {activeTab === "hero" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Hero Section Content
            </h2>
            <div className="space-y-4">
              <Input
                label="Badge Text"
                value={heroContent.badge}
                onChange={(e) => setHeroContent({ ...heroContent, badge: e.target.value })}
                placeholder="Premium IT Solutions"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Title (First Part)"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                  placeholder="We Build"
                />
                <Input
                  label="Title (Highlighted)"
                  value={heroContent.titleHighlight}
                  onChange={(e) => setHeroContent({ ...heroContent, titleHighlight: e.target.value })}
                  placeholder="Digital Excellence"
                />
              </div>
              <Textarea
                label="Description"
                value={heroContent.description}
                onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                placeholder="Hero description..."
              />
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Hero Statistics
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {heroContent.stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    label={`Stat ${index + 1} Value`}
                    value={stat.value}
                    onChange={(e) => updateHeroStat(index, "value", e.target.value)}
                    placeholder="100+"
                  />
                  <Input
                    label={`Stat ${index + 1} Label`}
                    value={stat.label}
                    onChange={(e) => updateHeroStat(index, "label", e.target.value)}
                    placeholder="Projects Delivered"
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* About Content */}
      {activeTab === "about" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              About Section Content
            </h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Title (First Part)"
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                  placeholder="Building the Future of"
                />
                <Input
                  label="Title (Highlighted)"
                  value={aboutContent.subtitle}
                  onChange={(e) => setAboutContent({ ...aboutContent, subtitle: e.target.value })}
                  placeholder="Digital Innovation"
                />
              </div>
              <Textarea
                label="Description"
                value={aboutContent.description}
                onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                placeholder="Company description..."
              />
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Mission & Vision
            </h2>
            <div className="space-y-4">
              <Textarea
                label="Mission Statement"
                value={aboutContent.mission}
                onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                placeholder="Our mission..."
              />
              <Textarea
                label="Vision Statement"
                value={aboutContent.vision}
                onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                placeholder="Our vision..."
              />
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Statistics
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {aboutContent.stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    label={`Stat ${index + 1} Number`}
                    value={stat.number}
                    onChange={(e) => {
                      const newStats = [...aboutContent.stats];
                      newStats[index] = { ...newStats[index], number: e.target.value };
                      setAboutContent({ ...aboutContent, stats: newStats });
                    }}
                    placeholder="100+"
                  />
                  <Input
                    label={`Stat ${index + 1} Label`}
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...aboutContent.stats];
                      newStats[index] = { ...newStats[index], label: e.target.value };
                      setAboutContent({ ...aboutContent, stats: newStats });
                    }}
                    placeholder="Projects Completed"
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Contact Content */}
      {activeTab === "contact" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={contactContent.email}
                onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
              />
              <Input
                label="Phone Number"
                value={contactContent.phone}
                onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
              />
              <Input
                label="Address"
                value={contactContent.address}
                onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
              />
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Working Hours
            </h2>
            <div className="space-y-4">
              <Input
                label="Weekdays (Monday - Friday)"
                value={contactContent.workingHoursWeekday}
                onChange={(e) => setContactContent({ ...contactContent, workingHoursWeekday: e.target.value })}
              />
              <Input
                label="Saturday"
                value={contactContent.workingHoursSaturday}
                onChange={(e) => setContactContent({ ...contactContent, workingHoursSaturday: e.target.value })}
              />
              <p className="text-sm text-gray-500">Sunday is marked as closed by default.</p>
            </div>
          </GlassCard>
        </motion.div>
      )}

          {/* Preview hint */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-4">
            <RefreshCw size={14} />
            <span>Changes will reflect on the website after saving.</span>
          </div>
        </>
      )}
    </div>
  );
}
