import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nepxcreation.com" },
    update: {},
    create: {
      email: "admin@nepxcreation.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN" as const,
    },
  });
  console.log("✅ Created admin user:", admin.email);

  // Create site content
  const heroContent = await prisma.siteContent.upsert({
    where: { section: "hero" },
    update: {},
    create: {
      section: "hero",
      content: {
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
      },
    },
  });
  console.log("✅ Created hero content");

  const aboutContent = await prisma.siteContent.upsert({
    where: { section: "about" },
    update: {},
    create: {
      section: "about",
      content: {
        title: "Crafting Digital Excellence Since Day One",
        description:
          "NepX Creation is a full-stack IT & digital solutions company dedicated to transforming businesses through innovative technology and design-first thinking.",
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
      },
    },
  });
  console.log("✅ Created about content");

  // Create services
  const services = [
    {
      title: "Custom Software Development",
      description:
        "From simple applications to complex enterprise systems, we build tailored software solutions that solve real business challenges.",
      icon: "Code",
      features: ["Web Applications", "Mobile Apps", "Enterprise Systems", "APIs & Integrations"],
      gradient: "from-blue-500 to-cyan-500",
      order: 1,
    },
    {
      title: "Website Design & Development",
      description:
        "Stunning, responsive websites that captivate visitors and convert them into customers with seamless user experiences.",
      icon: "Globe",
      features: ["Custom Websites", "E-commerce", "Landing Pages", "Web Portals"],
      gradient: "from-purple-500 to-pink-500",
      order: 2,
    },
    {
      title: "Automation Solutions",
      description:
        "Streamline your operations with intelligent automation, from workflow optimization to advanced bots and AI integration.",
      icon: "Zap",
      features: ["Workflow Automation", "Chatbots", "Process Optimization", "AI Integration"],
      gradient: "from-amber-500 to-orange-500",
      order: 3,
    },
    {
      title: "Video Production",
      description:
        "Professional video shooting and editing services for corporate content, product showcases, and cinematic productions.",
      icon: "Video",
      features: ["Corporate Videos", "Product Demos", "Cinematic Content", "Motion Graphics"],
      gradient: "from-red-500 to-rose-500",
      order: 4,
    },
    {
      title: "Digital Marketing",
      description:
        "Boost your online presence with strategic social media management, SEO, and data-driven marketing campaigns.",
      icon: "TrendingUp",
      features: ["Social Media", "SEO & SEM", "Content Strategy", "Analytics"],
      gradient: "from-green-500 to-emerald-500",
      order: 5,
    },
    {
      title: "IT Consulting",
      description:
        "Expert guidance on technology strategy, digital transformation, and custom tech solutions for your business needs.",
      icon: "Lightbulb",
      features: ["Tech Strategy", "Digital Transformation", "System Architecture", "Tech Audit"],
      gradient: "from-violet-500 to-purple-500",
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") },
      update: { ...service, features: service.features },
      create: {
        id: service.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: service.features,
        gradient: service.gradient,
        order: service.order,
      },
    });
  }
  console.log("✅ Created services");

  // Create projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with advanced inventory management and payment integration.",
      image:
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop",
      category: "Web",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      featured: true,
      order: 1,
    },
    {
      title: "Healthcare Mobile App",
      description:
        "Patient management and telemedicine application with real-time video consultations.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
      category: "Mobile",
      technologies: ["React Native", "Firebase", "WebRTC"],
      featured: true,
      order: 2,
    },
    {
      title: "Enterprise CRM System",
      description:
        "Custom CRM with AI-powered analytics, automation workflows, and team collaboration tools.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      category: "Software",
      technologies: ["React", "Python", "TensorFlow", "AWS"],
      featured: true,
      order: 3,
    },
    {
      title: "FinTech Dashboard",
      description:
        "Real-time financial analytics dashboard with advanced charting and reporting features.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      category: "Web",
      technologies: ["Vue.js", "D3.js", "Node.js", "MongoDB"],
      featured: false,
      order: 4,
    },
    {
      title: "Social Media Campaign",
      description:
        "Comprehensive digital marketing campaign that increased brand engagement by 300%.",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
      category: "Marketing",
      technologies: ["Analytics", "SEO", "Content Strategy"],
      featured: false,
      order: 5,
    },
    {
      title: "IoT Management Platform",
      description:
        "Industrial IoT platform for monitoring and managing connected devices at scale.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
      category: "Software",
      technologies: ["React", "Node.js", "MQTT", "InfluxDB"],
      featured: false,
      order: 6,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") },
      update: { ...project, technologies: project.technologies },
      create: {
        id: project.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        title: project.title,
        description: project.description,
        image: project.image,
        category: project.category,
        technologies: project.technologies,
        featured: project.featured,
        order: project.order,
      },
    });
  }
  console.log("✅ Created projects");

  // Create testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechStart Inc.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
      quote:
        "NepX Creation transformed our entire digital presence. Their attention to detail and innovative approach exceeded our expectations. The team delivered a stunning website that increased our conversions by 200%.",
      rating: 5,
      order: 1,
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "DataFlow Systems",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
      quote:
        "Working with NepX was an absolute pleasure. They built a complex enterprise system that streamlined our operations significantly. Their technical expertise and professionalism are unmatched.",
      rating: 5,
      order: 2,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GrowthHub",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop",
      quote:
        "The digital marketing campaign NepX created for us was phenomenal. Our social media engagement tripled, and we saw a 150% increase in qualified leads. Highly recommended!",
      rating: 5,
      order: 3,
    },
    {
      name: "David Park",
      role: "Founder",
      company: "InnovateTech",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop",
      quote:
        "NepX Creation delivered our mobile app on time and beyond our expectations. The UI/UX design is beautiful, and the app performance is outstanding. They're now our go-to tech partner.",
      rating: 5,
      order: 4,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.name.toLowerCase().replace(/\s+/g, "-") },
      update: testimonial,
      create: {
        id: testimonial.name.toLowerCase().replace(/\s+/g, "-"),
        ...testimonial,
      },
    });
  }
  console.log("✅ Created testimonials");

  // Create site settings
  const settings = [
    {
      key: "general",
      value: {
        siteName: "NepX Creation",
        tagline: "Premium IT & Digital Solutions",
        description:
          "NepX Creation is a full-stack IT & digital solutions company providing custom software development, website design, automation, video production, and digital marketing services.",
        logo: "/logo.svg",
        favicon: "/favicon.ico",
      },
    },
    {
      key: "contact",
      value: {
        email: "hello@nepxcreation.com",
        phone: "+977 123 456 7890",
        address: "Kathmandu, Nepal",
        workingHours: {
          weekdays: "9:00 AM - 6:00 PM",
          saturday: "10:00 AM - 4:00 PM",
          sunday: "Closed",
        },
      },
    },
    {
      key: "social",
      value: {
        facebook: "https://facebook.com/nepxcreation",
        twitter: "https://twitter.com/nepxcreation",
        instagram: "https://instagram.com/nepxcreation",
        linkedin: "https://linkedin.com/company/nepxcreation",
        youtube: "https://youtube.com/@nepxcreation",
      },
    },
    {
      key: "seo",
      value: {
        title: "NepX Creation | Premium IT & Digital Solutions",
        description:
          "Full-stack IT & digital solutions company providing custom software, web development, automation, and digital marketing.",
        keywords: [
          "IT company",
          "software development",
          "web development",
          "automation",
          "digital marketing",
          "video production",
          "Nepal",
          "NepX Creation",
        ],
        ogImage: "/og-image.jpg",
      },
    },
    {
      key: "theme",
      value: {
        primaryColor: "#00d4ff",
        accentColor: "#8b5cf6",
        backgroundColor: "#000000",
        textColor: "#ffffff",
        fontHeading: "Space Grotesk",
        fontBody: "Inter",
      },
    },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("✅ Created site settings");

  console.log("🎉 Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
