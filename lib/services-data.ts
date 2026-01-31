import {
  Code,
  Globe,
  Zap,
  Video,
  TrendingUp,
  Smartphone,
  GraduationCap,
  Building2,
  Utensils,
  Plane,
  Stethoscope,
  Scale,
  Heart,
  Camera,
  type LucideIcon,
} from "lucide-react";

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  subServices?: SubService[];
}

export interface SubService {
  title: string;
  description: string;
}

export const mainServices: ServiceCategory[] = [
  {
    id: "software-development",
    title: "Custom Software Development",
    description:
      "From simple applications to complex enterprise systems, we build tailored software solutions that solve real business challenges and drive digital transformation.",
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Web Applications",
      "Desktop Software",
      "Enterprise Systems",
      "APIs & Integrations",
      "Database Design",
      "Cloud Solutions",
    ],
    subServices: [
      {
        title: "Enterprise Resource Planning (ERP)",
        description: "Custom ERP systems for inventory, HR, accounting, and operations management.",
      },
      {
        title: "Customer Relationship Management (CRM)",
        description: "Build lasting customer relationships with tailored CRM solutions.",
      },
      {
        title: "Business Process Automation",
        description: "Streamline operations with intelligent workflow automation.",
      },
      {
        title: "Data Analytics Platforms",
        description: "Transform raw data into actionable business insights.",
      },
    ],
  },
  {
    id: "app-development",
    title: "Mobile App Development",
    description:
      "Create powerful, user-friendly mobile applications for iOS and Android that engage users and drive business growth.",
    icon: Smartphone,
    gradient: "from-green-500 to-teal-500",
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Apps",
      "React Native",
      "Flutter Development",
      "App Store Optimization",
    ],
    subServices: [
      {
        title: "Native iOS Apps",
        description: "High-performance apps built specifically for Apple devices.",
      },
      {
        title: "Native Android Apps",
        description: "Feature-rich applications optimized for Android ecosystem.",
      },
      {
        title: "Cross-Platform Development",
        description: "Build once, deploy everywhere with React Native or Flutter.",
      },
      {
        title: "App Maintenance & Updates",
        description: "Ongoing support, updates, and feature enhancements.",
      },
    ],
  },
  {
    id: "website-development",
    title: "Website Design & Development",
    description:
      "Stunning, responsive websites that captivate visitors and convert them into customers with seamless user experiences.",
    icon: Globe,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Custom Websites",
      "E-commerce Solutions",
      "Landing Pages",
      "Web Portals",
      "CMS Development",
      "Website Redesign",
    ],
    subServices: [
      {
        title: "Schools & Colleges Website Development",
        description: "Modern educational websites with admission portals, course management, and student information systems.",
      },
      {
        title: "Education & Abroad Study Consultancy Websites",
        description: "Professional websites for study abroad consultants with course listings and inquiry forms.",
      },
      {
        title: "Hospital, Clinic & Dental Website Design",
        description: "Healthcare websites with appointment booking, doctor profiles, and patient portals.",
      },
      {
        title: "Restaurant, Cafe & Hotel Website",
        description: "Appetizing websites with online menus, reservations, and ordering systems.",
      },
      {
        title: "Gym, Salon & Spa Websites",
        description: "Fitness and wellness websites with class schedules, booking, and membership management.",
      },
      {
        title: "Real Estate & Construction Company Websites",
        description: "Property listing websites with virtual tours, search filters, and lead generation.",
      },
      {
        title: "Travel & Trekking Agency Websites",
        description: "Adventure travel websites with tour packages, booking systems, and travel guides.",
      },
      {
        title: "Doctor Website Design",
        description: "Professional medical websites showcasing expertise with appointment scheduling.",
      },
      {
        title: "Lawyer & Law Firm Website",
        description: "Authoritative legal websites highlighting practice areas and client testimonials.",
      },
      {
        title: "Chartered Accountant Website",
        description: "Professional CA websites showcasing services, expertise, and client success stories.",
      },
      {
        title: "Engineer & Architect Portfolio Website",
        description: "Stunning portfolio websites showcasing projects, blueprints, and achievements.",
      },
      {
        title: "Coach, Trainer & Consultant Website",
        description: "Personal branding websites with course offerings and booking systems.",
      },
      {
        title: "Startup Company Website",
        description: "Modern, innovative websites that attract investors and customers.",
      },
      {
        title: "E-commerce Website Development",
        description: "Full-featured online stores with payment integration and inventory management.",
      },
      {
        title: "Service-based Business Website",
        description: "Lead-generating websites for service providers with booking and inquiries.",
      },
      {
        title: "Landing Pages for Ads & Lead Generation",
        description: "High-converting landing pages optimized for advertising campaigns.",
      },
      {
        title: "NGO / INGO Website Development",
        description: "Impactful websites for non-profits with donation systems and volunteer management.",
      },
      {
        title: "Foundation & Trust Websites",
        description: "Professional websites showcasing mission, impact, and donation options.",
      },
      {
        title: "CSR & Donation Websites",
        description: "Transparent platforms for corporate social responsibility and charitable giving.",
      },
      {
        title: "Portfolio Website",
        description: "Stunning showcase websites for creatives and professionals.",
      },
      {
        title: "Freelancer Website",
        description: "Personal branding websites highlighting skills and past work.",
      },
      {
        title: "Photographer / Designer Website",
        description: "Visual portfolio websites with galleries and client booking systems.",
      },
      {
        title: "Blogger & Content Creator Website",
        description: "Engaging content platforms with monetization and audience growth features.",
      },
    ],
  },
  {
    id: "automation",
    title: "Automation Solutions",
    description:
      "Streamline your operations with intelligent automation, from workflow optimization to advanced bots and AI integration.",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
    features: [
      "Workflow Automation",
      "Chatbots & AI Assistants",
      "Process Optimization",
      "AI Integration",
      "RPA Solutions",
      "API Automation",
    ],
    subServices: [
      {
        title: "Business Process Automation",
        description: "Automate repetitive tasks and streamline business workflows.",
      },
      {
        title: "AI Chatbots & Virtual Assistants",
        description: "24/7 customer support with intelligent conversational AI.",
      },
      {
        title: "Marketing Automation",
        description: "Automated email campaigns, social posting, and lead nurturing.",
      },
      {
        title: "Data Entry & Processing Automation",
        description: "Eliminate manual data handling with smart automation.",
      },
    ],
  },
  {
    id: "video-production",
    title: "Video Production",
    description:
      "Professional video shooting and editing services for corporate content, product showcases, and cinematic productions.",
    icon: Video,
    gradient: "from-red-500 to-rose-500",
    features: [
      "Corporate Videos",
      "Product Demos",
      "Cinematic Content",
      "Motion Graphics",
      "Video Editing",
      "Animation",
    ],
    subServices: [
      {
        title: "Corporate Videos",
        description: "Professional videos for company profiles, training, and communications.",
      },
      {
        title: "Product & Service Videos",
        description: "Showcase your offerings with compelling visual storytelling.",
      },
      {
        title: "Social Media Video Content",
        description: "Engaging short-form content for all social platforms.",
      },
      {
        title: "Motion Graphics & Animation",
        description: "Eye-catching animated content for explainers and promotions.",
      },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Boost your online presence with strategic social media management, SEO, and data-driven marketing campaigns.",
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Social Media Marketing",
      "SEO & SEM",
      "Content Strategy",
      "PPC Advertising",
      "Email Marketing",
      "Analytics",
    ],
    subServices: [
      {
        title: "Search Engine Optimization (SEO)",
        description: "Improve your visibility and rank higher on Google.",
      },
      {
        title: "Social Media Marketing",
        description: "Build brand awareness and engagement across all platforms.",
      },
      {
        title: "Pay-Per-Click Advertising",
        description: "Targeted ads on Google, Facebook, Instagram, and more.",
      },
      {
        title: "Content Marketing",
        description: "Strategic content that attracts and converts your audience.",
      },
    ],
  },
];

export const industryServices = [
  {
    icon: GraduationCap,
    title: "Education & E-Learning",
    items: [
      "Schools & Colleges Website",
      "Education Consultancy Websites",
      "Online Learning Platforms",
      "Student Management Systems",
    ],
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Medical",
    items: [
      "Hospital & Clinic Websites",
      "Doctor Portfolio Websites",
      "Dental Practice Websites",
      "Telemedicine Platforms",
    ],
  },
  {
    icon: Building2,
    title: "Real Estate & Construction",
    items: [
      "Real Estate Listing Websites",
      "Construction Company Websites",
      "Property Management Systems",
      "Virtual Tour Integration",
    ],
  },
  {
    icon: Utensils,
    title: "Hospitality & Food",
    items: [
      "Restaurant Websites",
      "Hotel Booking Systems",
      "Cafe & Bar Websites",
      "Food Delivery Platforms",
    ],
  },
  {
    icon: Plane,
    title: "Travel & Tourism",
    items: [
      "Travel Agency Websites",
      "Trekking Company Websites",
      "Tour Booking Systems",
      "Travel Blog Platforms",
    ],
  },
  {
    icon: Scale,
    title: "Professional Services",
    items: [
      "Law Firm Websites",
      "CA & Accounting Websites",
      "Consultant Websites",
      "Coach & Trainer Websites",
    ],
  },
  {
    icon: Heart,
    title: "Non-Profit & Social",
    items: [
      "NGO / INGO Websites",
      "Foundation Websites",
      "Donation Platforms",
      "Volunteer Management",
    ],
  },
  {
    icon: Camera,
    title: "Creative & Portfolio",
    items: [
      "Photographer Websites",
      "Designer Portfolios",
      "Artist Showcases",
      "Content Creator Platforms",
    ],
  },
];

export function getServiceById(id: string): ServiceCategory | undefined {
  return mainServices.find((service) => service.id === id);
}

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return mainServices.find(
    (service) => service.title.toLowerCase().replace(/\s+/g, "-") === slug
  );
}
