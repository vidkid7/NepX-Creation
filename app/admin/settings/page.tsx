"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Palette, Search, Share2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const tabs = [
  { id: "general", label: "General", icon: Globe },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "seo", label: "SEO", icon: Search },
  { id: "social", label: "Social Links", icon: Share2 },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "NepX Creation",
    tagline: "Premium IT & Digital Solutions",
    description: "NepX Creation is a full-stack IT & digital solutions company providing custom software development, website design, automation, video production, and digital marketing services.",
    email: "hello@nepxcreation.com",
    phone: "+977 123 456 7890",
    address: "Kathmandu, Nepal",
  });

  // Theme settings
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#00d4ff",
    accentColor: "#8b5cf6",
    backgroundColor: "#000000",
    fontHeading: "Space Grotesk",
    fontBody: "Inter",
  });

  // SEO settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "NepX Creation | Premium IT & Digital Solutions",
    metaDescription: "Full-stack IT & digital solutions company providing custom software, web development, automation, and digital marketing.",
    keywords: "IT company, software development, web development, automation, digital marketing, video production, Nepal",
    ogImage: "/og-image.jpg",
  });

  // Social links
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/nepxcreation",
    twitter: "https://twitter.com/nepxcreation",
    instagram: "https://instagram.com/nepxcreation",
    linkedin: "https://linkedin.com/company/nepxcreation",
    youtube: "https://youtube.com/@nepxcreation",
    github: "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const colorPresets = [
    { name: "Cyan", primary: "#00d4ff", accent: "#8b5cf6" },
    { name: "Blue", primary: "#3b82f6", accent: "#ec4899" },
    { name: "Green", primary: "#10b981", accent: "#6366f1" },
    { name: "Purple", primary: "#a855f7", accent: "#f97316" },
    { name: "Red", primary: "#ef4444", accent: "#eab308" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Settings</h1>
          <p className="text-gray-400">Configure your website settings</p>
        </div>
        <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save size={18} />}>
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Site Information
            </h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Site Name"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                />
                <Input
                  label="Tagline"
                  value={generalSettings.tagline}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                />
              </div>
              <Textarea
                label="Description"
                value={generalSettings.description}
                onChange={(e) => setGeneralSettings({ ...generalSettings, description: e.target.value })}
              />
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={generalSettings.email}
                onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Phone"
                  value={generalSettings.phone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                />
                <Input
                  label="Address"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Theme Settings */}
      {activeTab === "theme" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Color Presets
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setThemeSettings({
                    ...themeSettings,
                    primaryColor: preset.primary,
                    accentColor: preset.accent,
                  })}
                  className={`p-4 rounded-xl border transition-all ${
                    themeSettings.primaryColor === preset.primary
                      ? "border-primary/50 bg-primary/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex gap-2 justify-center mb-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: preset.accent }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{preset.name}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Custom Colors
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Primary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-lg cursor-pointer border-0"
                  />
                  <Input
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Accent Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={themeSettings.accentColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                    className="w-12 h-12 rounded-lg cursor-pointer border-0"
                  />
                  <Input
                    value={themeSettings.accentColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={themeSettings.backgroundColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, backgroundColor: e.target.value })}
                    className="w-12 h-12 rounded-lg cursor-pointer border-0"
                  />
                  <Input
                    value={themeSettings.backgroundColor}
                    onChange={(e) => setThemeSettings({ ...themeSettings, backgroundColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Typography
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Heading Font</label>
                <select
                  value={themeSettings.fontHeading}
                  onChange={(e) => setThemeSettings({ ...themeSettings, fontHeading: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                >
                  <option value="Space Grotesk">Space Grotesk</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Raleway">Raleway</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Body Font</label>
                <select
                  value={themeSettings.fontBody}
                  onChange={(e) => setThemeSettings({ ...themeSettings, fontBody: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                >
                  <option value="Inter">Inter</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Lato">Lato</option>
                </select>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* SEO Settings */}
      {activeTab === "seo" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              SEO Metadata
            </h2>
            <div className="space-y-4">
              <Input
                label="Meta Title"
                value={seoSettings.metaTitle}
                onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
              />
              <Textarea
                label="Meta Description"
                value={seoSettings.metaDescription}
                onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
              />
              <Input
                label="Keywords (comma separated)"
                value={seoSettings.keywords}
                onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
              />
              <Input
                label="Open Graph Image URL"
                value={seoSettings.ogImage}
                onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
              />
            </div>
          </GlassCard>

          {/* Preview */}
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Search Result Preview
            </h2>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-primary text-sm truncate">{`https://nepxcreation.com`}</p>
              <p className="text-lg text-blue-400 hover:underline cursor-pointer truncate">
                {seoSettings.metaTitle}
              </p>
              <p className="text-sm text-gray-400 line-clamp-2">
                {seoSettings.metaDescription}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Social Links */}
      {activeTab === "social" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Social Media Links
            </h2>
            <div className="space-y-4">
              <Input
                label="Facebook"
                value={socialLinks.facebook}
                onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
              />
              <Input
                label="Twitter / X"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                placeholder="https://twitter.com/..."
              />
              <Input
                label="Instagram"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
              <Input
                label="LinkedIn"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/..."
              />
              <Input
                label="YouTube"
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                placeholder="https://youtube.com/@..."
              />
              <Input
                label="GitHub"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
