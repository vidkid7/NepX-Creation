import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const servicesData = [
  // EDUCATION & LEARNING
  {
    title: "Schools & Colleges Website Development",
    description: "Professional website solutions for educational institutions with student portals, admission systems, course management, event calendars, and parent-teacher communication features. Built to enhance learning experiences and streamline administrative tasks.",
    icon: "GraduationCap",
    gradient: "from-blue-500 to-indigo-600",
    category: "Education",
    features: [
      "Student & Parent Portal",
      "Online Admission System",
      "Course & Class Management",
      "Event Calendar & Announcements",
      "Faculty Directory",
      "Library Management Integration",
      "Exam Results & Grade Portal",
      "Mobile Responsive Design"
    ],
    order: 1
  },
  {
    title: "Education & Abroad Study Consultancy Websites",
    description: "Comprehensive websites for education consultancies offering study abroad guidance, university listings, visa assistance, and student counseling services. Features include course finder, application tracking, and consultation booking.",
    icon: "Globe",
    gradient: "from-purple-500 to-pink-600",
    category: "Education",
    features: [
      "University & Course Database",
      "Student Application Tracking",
      "Visa Guidance Portal",
      "Online Consultation Booking",
      "Document Management System",
      "Country-wise Study Guides",
      "Success Stories & Testimonials",
      "Multi-language Support"
    ],
    order: 2
  },

  // HEALTHCARE
  {
    title: "Hospital, Clinic & Dental Website Design",
    description: "Modern healthcare websites with appointment booking, doctor profiles, department information, patient portals, and emergency services. HIPAA-compliant solutions for hospitals, clinics, and dental practices.",
    icon: "Heart",
    gradient: "from-red-500 to-rose-600",
    category: "Healthcare",
    features: [
      "Online Appointment Booking",
      "Doctor & Staff Profiles",
      "Department & Services Info",
      "Patient Portal & Records",
      "Emergency Contact System",
      "Health Blog & Resources",
      "Insurance Information",
      "Telemedicine Integration"
    ],
    order: 3
  },
  {
    title: "Doctor Website Design",
    description: "Personal branding websites for doctors and medical professionals featuring appointment scheduling, patient testimonials, medical expertise showcase, and health blog. Perfect for building trust and growing your practice.",
    icon: "Stethoscope",
    gradient: "from-teal-500 to-cyan-600",
    category: "Healthcare",
    features: [
      "Professional Profile & Bio",
      "Online Appointment System",
      "Patient Reviews & Ratings",
      "Medical Expertise Showcase",
      "Health Tips & Blog",
      "Before/After Gallery",
      "Insurance & Payment Info",
      "Contact & Location Map"
    ],
    order: 4
  },

  // HOSPITALITY
  {
    title: "Restaurant, Cafe & Hotel Website",
    description: "Stunning websites for restaurants, cafes, and hotels with online menu, table reservations, room booking, photo galleries, and customer reviews. Integrated with delivery platforms and payment gateways.",
    icon: "Utensils",
    gradient: "from-orange-500 to-amber-600",
    category: "Hospitality",
    features: [
      "Online Menu & Ordering",
      "Table Reservation System",
      "Room Booking (Hotels)",
      "Photo Gallery & Virtual Tours",
      "Customer Reviews & Ratings",
      "Special Offers & Events",
      "Delivery Integration",
      "Multi-location Support"
    ],
    order: 5
  },

  // WELLNESS & FITNESS
  {
    title: "Gym, Salon & Spa Websites",
    description: "Dynamic websites for fitness centers, beauty salons, and spas with class schedules, membership plans, online booking, trainer profiles, and service menus. Boost bookings and member engagement.",
    icon: "Dumbbell",
    gradient: "from-green-500 to-emerald-600",
    category: "Wellness",
    features: [
      "Class Schedule & Booking",
      "Membership Plans & Pricing",
      "Trainer/Stylist Profiles",
      "Service Menu & Packages",
      "Online Appointment Booking",
      "Member Portal & Progress Tracking",
      "Photo Gallery & Transformations",
      "Payment & Subscription Management"
    ],
    order: 6
  },

  // REAL ESTATE & CONSTRUCTION
  {
    title: "Real Estate & Construction Company Websites",
    description: "Professional websites for real estate agencies and construction companies with property listings, project showcases, virtual tours, inquiry forms, and CRM integration. Drive sales and showcase your portfolio.",
    icon: "Building2",
    gradient: "from-slate-500 to-gray-700",
    category: "Real Estate",
    features: [
      "Property Listing & Search",
      "Virtual Tours & 3D Views",
      "Project Portfolio Showcase",
      "Inquiry & Lead Management",
      "Mortgage Calculator",
      "Agent Profiles & Contact",
      "Map Integration & Location",
      "Client Testimonials"
    ],
    order: 7
  },

  // TRAVEL & TOURISM
  {
    title: "Travel & Trekking Agency Websites",
    description: "Adventure-ready websites for travel agencies and trekking companies with tour packages, booking systems, itinerary builders, photo galleries, and customer reviews. Perfect for showcasing destinations and experiences.",
    icon: "Plane",
    gradient: "from-sky-500 to-blue-600",
    category: "Travel",
    features: [
      "Tour Package Listings",
      "Online Booking & Payment",
      "Itinerary Builder",
      "Destination Guides",
      "Photo & Video Galleries",
      "Customer Reviews & Ratings",
      "Travel Blog & Tips",
      "Multi-currency Support"
    ],
    order: 8
  },

  // PROFESSIONAL SERVICES - LEGAL
  {
    title: "Lawyer & Law Firm Website",
    description: "Professional websites for lawyers and law firms with practice area details, attorney profiles, case studies, consultation booking, and legal resources. Build credibility and attract clients.",
    icon: "Scale",
    gradient: "from-amber-600 to-yellow-700",
    category: "Professional",
    features: [
      "Practice Areas & Expertise",
      "Attorney Profiles & Credentials",
      "Case Studies & Success Stories",
      "Consultation Booking",
      "Legal Resources & Blog",
      "Client Testimonials",
      "Contact & Office Locations",
      "Secure Client Portal"
    ],
    order: 9
  },

  // PROFESSIONAL SERVICES - FINANCE
  {
    title: "Chartered Accountant Website",
    description: "Professional websites for CAs and accounting firms with service offerings, tax calculators, client portals, appointment booking, and financial resources. Establish trust and grow your practice.",
    icon: "Calculator",
    gradient: "from-emerald-600 to-teal-700",
    category: "Professional",
    features: [
      "Service Portfolio & Pricing",
      "Tax Calculators & Tools",
      "Client Portal & Document Upload",
      "Appointment Scheduling",
      "Financial Blog & Resources",
      "Team Profiles & Expertise",
      "Testimonials & Case Studies",
      "Secure Communication"
    ],
    order: 10
  },

  // PROFESSIONAL SERVICES - ENGINEERING
  {
    title: "Engineer & Architect Portfolio Website",
    description: "Stunning portfolio websites for engineers and architects showcasing projects, designs, blueprints, 3D models, and professional credentials. Perfect for winning clients and displaying expertise.",
    icon: "Ruler",
    gradient: "from-indigo-600 to-purple-700",
    category: "Professional",
    features: [
      "Project Portfolio & Gallery",
      "3D Models & Blueprints",
      "Service Offerings",
      "Professional Credentials",
      "Client Testimonials",
      "Blog & Industry Insights",
      "Contact & Consultation",
      "Before/After Showcases"
    ],
    order: 11
  },

  // PROFESSIONAL SERVICES - COACHING
  {
    title: "Coach, Trainer & Consultant Website",
    description: "Impactful websites for coaches, trainers, and consultants with service packages, booking systems, resource libraries, client testimonials, and blog. Build authority and attract clients.",
    icon: "Target",
    gradient: "from-rose-500 to-pink-600",
    category: "Professional",
    features: [
      "Service Packages & Pricing",
      "Online Booking & Scheduling",
      "Resource Library & Downloads",
      "Client Success Stories",
      "Blog & Thought Leadership",
      "Video Testimonials",
      "Free Consultation Booking",
      "Payment Integration"
    ],
    order: 12
  },

  // BUSINESS & CORPORATE
  {
    title: "Startup Company Website",
    description: "Modern, innovative websites for startups with product showcases, team profiles, investor information, blog, and contact forms. Make a strong first impression and attract investors.",
    icon: "Rocket",
    gradient: "from-violet-500 to-purple-600",
    category: "Business",
    features: [
      "Product/Service Showcase",
      "Team Profiles & About Us",
      "Investor Information",
      "Company Blog & News",
      "Career Opportunities",
      "Contact & Demo Request",
      "Social Media Integration",
      "Analytics & Tracking"
    ],
    order: 13
  },
  {
    title: "Service-based Business Website",
    description: "Professional websites for service businesses with service listings, pricing, booking systems, customer testimonials, and portfolio. Drive leads and showcase your expertise.",
    icon: "Briefcase",
    gradient: "from-blue-600 to-cyan-700",
    category: "Business",
    features: [
      "Service Catalog & Pricing",
      "Online Booking & Quotes",
      "Portfolio & Case Studies",
      "Customer Testimonials",
      "Team Profiles",
      "Blog & Resources",
      "Contact & Lead Forms",
      "CRM Integration"
    ],
    order: 14
  },

  // E-COMMERCE
  {
    title: "E-commerce Website Development",
    description: "Full-featured online stores with product catalogs, shopping cart, payment gateway integration, inventory management, and order tracking. Built for conversions and scalability.",
    icon: "ShoppingCart",
    gradient: "from-green-600 to-emerald-700",
    category: "E-commerce",
    features: [
      "Product Catalog & Search",
      "Shopping Cart & Checkout",
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Tracking & Management",
      "Customer Accounts & Wishlists",
      "Reviews & Ratings",
      "Mobile Commerce Ready"
    ],
    order: 15
  },

  // MARKETING
  {
    title: "Landing Pages for Ads & Lead Generation",
    description: "High-converting landing pages optimized for ad campaigns and lead generation with compelling CTAs, forms, A/B testing, and analytics integration. Maximize your marketing ROI.",
    icon: "MousePointerClick",
    gradient: "from-yellow-500 to-orange-600",
    category: "Marketing",
    features: [
      "Conversion-Optimized Design",
      "Lead Capture Forms",
      "A/B Testing Ready",
      "Analytics Integration",
      "Fast Loading Speed",
      "Mobile Responsive",
      "CRM Integration",
      "Thank You Pages"
    ],
    order: 16
  },

  // NON-PROFIT & SOCIAL
  {
    title: "NGO / INGO Website Development",
    description: "Impactful websites for NGOs and INGOs with mission statements, project showcases, donation systems, volunteer registration, and impact reports. Amplify your social impact.",
    icon: "Heart",
    gradient: "from-red-600 to-rose-700",
    category: "Non-Profit",
    features: [
      "Mission & Vision Showcase",
      "Project & Program Details",
      "Online Donation System",
      "Volunteer Registration",
      "Impact Reports & Stories",
      "Event Calendar",
      "Newsletter Signup",
      "Multi-language Support"
    ],
    order: 17
  },
  {
    title: "Foundation & Trust Websites",
    description: "Professional websites for foundations and trusts with grant information, application portals, beneficiary stories, financial transparency, and donation systems. Build trust and credibility.",
    icon: "Building",
    gradient: "from-indigo-600 to-blue-700",
    category: "Non-Profit",
    features: [
      "Grant Information & Applications",
      "Beneficiary Stories & Impact",
      "Financial Transparency Reports",
      "Donation & Fundraising",
      "Board & Team Profiles",
      "News & Updates",
      "Contact & Inquiry Forms",
      "Document Library"
    ],
    order: 18
  },
  {
    title: "CSR & Donation Websites",
    description: "Dedicated websites for corporate social responsibility initiatives and donation campaigns with project tracking, impact visualization, donor recognition, and transparent reporting.",
    icon: "HandHeart",
    gradient: "from-pink-600 to-rose-700",
    category: "Non-Profit",
    features: [
      "CSR Project Showcase",
      "Donation Campaign Management",
      "Impact Visualization & Metrics",
      "Donor Recognition Wall",
      "Transparent Reporting",
      "Volunteer Opportunities",
      "Partner & Sponsor Logos",
      "Social Media Integration"
    ],
    order: 19
  },

  // CREATIVE & PERSONAL
  {
    title: "Portfolio Website",
    description: "Beautiful portfolio websites for creatives and professionals to showcase work, skills, achievements, and contact information. Stand out and attract opportunities.",
    icon: "Palette",
    gradient: "from-purple-600 to-pink-700",
    category: "Creative",
    features: [
      "Project Gallery & Showcase",
      "About & Skills Section",
      "Resume/CV Download",
      "Client Testimonials",
      "Contact Form",
      "Blog (Optional)",
      "Social Media Links",
      "Mobile Responsive"
    ],
    order: 20
  },
  {
    title: "Freelancer Website",
    description: "Professional websites for freelancers with service offerings, portfolio, pricing, availability calendar, client testimonials, and booking system. Win more clients and projects.",
    icon: "UserCheck",
    gradient: "from-cyan-600 to-blue-700",
    category: "Creative",
    features: [
      "Service Offerings & Pricing",
      "Portfolio & Case Studies",
      "Availability Calendar",
      "Client Testimonials",
      "Project Inquiry Form",
      "Skills & Expertise",
      "Blog & Resources",
      "Payment Integration"
    ],
    order: 21
  },
  {
    title: "Photographer / Designer Website",
    description: "Stunning visual websites for photographers and designers with high-quality galleries, booking systems, pricing packages, and client proofing areas. Showcase your creativity.",
    icon: "Camera",
    gradient: "from-slate-600 to-gray-800",
    category: "Creative",
    features: [
      "High-Quality Image Galleries",
      "Portfolio Categories",
      "Booking & Inquiry System",
      "Pricing Packages",
      "Client Proofing Area",
      "About & Services",
      "Testimonials & Reviews",
      "Social Media Integration"
    ],
    order: 22
  },
  {
    title: "Blogger & Content Creator Website",
    description: "Engaging websites for bloggers and content creators with article management, social media integration, newsletter signup, monetization features, and analytics. Grow your audience.",
    icon: "PenTool",
    gradient: "from-orange-600 to-red-700",
    category: "Creative",
    features: [
      "Blog & Article Management",
      "Category & Tag System",
      "Newsletter Subscription",
      "Social Media Integration",
      "Comment System",
      "Ad Space Management",
      "Analytics Dashboard",
      "SEO Optimized"
    ],
    order: 23
  }
];

async function seedServices() {
  console.log('🌱 Starting services seed...');

  try {
    // Get the highest order number from existing services
    const existingServices = await prisma.service.findMany({
      orderBy: { order: 'desc' },
      take: 1,
      select: { order: true }
    });
    
    const startOrder = existingServices.length > 0 ? existingServices[0].order + 1 : 1;
    console.log(`✅ Will add new services starting from order ${startOrder}`);

    // Create new services
    for (const service of servicesData) {
      await prisma.service.create({
        data: {
          title: service.title,
          description: service.description,
          icon: service.icon,
          gradient: service.gradient,
          features: service.features,
          order: startOrder + service.order - 1, // Adjust order to continue from existing
          active: true
        }
      });
      console.log(`✅ Created: ${service.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${servicesData.length} services!`);
    console.log('\n📊 Services by Category:');
    
    const categories = Array.from(new Set(servicesData.map(s => s.category)));
    categories.forEach(cat => {
      const count = servicesData.filter(s => s.category === cat).length;
      console.log(`   ${cat}: ${count} services`);
    });

  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedServices();
