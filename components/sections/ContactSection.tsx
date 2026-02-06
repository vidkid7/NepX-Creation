"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import FadeIn from "@/components/animations/FadeIn";

type ContactContent = {
  email: string;
  phone: string;
  address: string;
  workingHoursWeekday?: string;
  workingHoursSaturday?: string;
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactContent, setContactContent] = useState<ContactContent>({
    email: "hello@nepxcreation.com",
    phone: "+977 123 456 7890",
    address: "Kathmandu, Nepal",
    workingHoursWeekday: "9:00 AM - 6:00 PM",
    workingHoursSaturday: "10:00 AM - 4:00 PM",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = await fetch('/api/public/content/contact');
        const data = await response.json();
        if (data.success) {
          setContactContent(data.data);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContactInfo();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: contactContent.email,
      href: `mailto:${contactContent.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactContent.phone,
      href: `tel:${contactContent.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactContent.address,
      href: "#",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px]" />
      </div>

      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          label="Contact Us"
          title="Let's Start a Conversation"
          description="Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn direction="left">
              <div className="space-y-4">
                <h3 className="text-2xl font-heading font-semibold text-white">
                  Get in Touch
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We&apos;re here to help and answer any questions you might have.
                  We look forward to hearing from you.
                </p>
              </div>
            </FadeIn>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <FadeIn key={item.label} delay={index * 0.1} direction="left">
                  <a
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-primary/20 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>

            {/* Working Hours */}
            <FadeIn delay={0.3} direction="left">
              <GlassCard className="mt-6">
                <h4 className="text-lg font-heading font-semibold text-white mb-4">
                  Working Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monday - Friday</span>
                    <span className="text-white">{contactContent.workingHoursWeekday || "9:00 AM - 6:00 PM"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Saturday</span>
                    <span className="text-white">{contactContent.workingHoursSaturday || "10:00 AM - 4:00 PM"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sunday</span>
                    <span className="text-gray-400">Closed</span>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <FadeIn direction="right">
              <GlassCard>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h4 className="text-xl font-heading font-semibold text-white mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-gray-400">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                    <Textarea
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      rightIcon={<Send size={18} />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
