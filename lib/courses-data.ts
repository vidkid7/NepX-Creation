import {
  Code,
  Database,
  Globe,
  Smartphone,
  Server,
  Cloud,
  Shield,
  Brain,
  Palette,
  Terminal,
  GitBranch,
  Layers,
  Cpu,
  Network,
  LineChart,
  LucideIcon,
} from "lucide-react";

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  gradient: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  mode: ("Online" | "Offline" | "Hybrid")[];
  price: {
    online: number;
    offline: number;
  };
  curriculum: {
    title: string;
    topics: string[];
  }[];
  features: string[];
  tools: string[];
  certificate: boolean;
  projects: number;
  popular: boolean;
  category: string;
}

export const courseCategories = [
  "All",
  "Web Development",
  "Mobile Development",
  "Database",
  "DevOps & Cloud",
  "Programming",
  "Design",
  "Data Science",
];

export const courses: Course[] = [
  {
    id: "mern-stack",
    title: "MERN Stack Development",
    shortDescription: "Master MongoDB, Express.js, React, and Node.js to build modern full-stack web applications.",
    fullDescription: "Become a full-stack developer with our comprehensive MERN Stack course. Learn to build scalable, production-ready web applications using MongoDB for database, Express.js for backend APIs, React for dynamic frontends, and Node.js for server-side JavaScript. This course covers everything from basics to advanced concepts including Redux, authentication, deployment, and best practices.",
    icon: Code,
    gradient: "from-cyan-500 to-blue-600",
    duration: "4 Months",
    level: "Beginner",
    mode: ["Online", "Offline", "Hybrid"],
    price: {
      online: 15000,
      offline: 20000,
    },
    curriculum: [
      {
        title: "Module 1: Web Fundamentals",
        topics: ["HTML5 & CSS3", "JavaScript ES6+", "Git & GitHub", "Responsive Design"],
      },
      {
        title: "Module 2: React.js Frontend",
        topics: ["React Components & JSX", "Hooks & State Management", "Redux Toolkit", "React Router", "API Integration"],
      },
      {
        title: "Module 3: Node.js & Express",
        topics: ["Node.js Fundamentals", "Express.js Framework", "RESTful API Design", "Middleware & Authentication", "Error Handling"],
      },
      {
        title: "Module 4: MongoDB Database",
        topics: ["MongoDB Basics", "Mongoose ODM", "Data Modeling", "Aggregation", "Indexing & Performance"],
      },
      {
        title: "Module 5: Full Stack Integration",
        topics: ["Project Architecture", "Deployment (Vercel, Railway)", "CI/CD Basics", "Security Best Practices", "Final Project"],
      },
    ],
    features: [
      "Live project-based learning",
      "Industry expert instructors",
      "24/7 doubt support",
      "Job assistance",
      "Lifetime access to materials",
      "Weekly assignments",
    ],
    tools: ["VS Code", "MongoDB Atlas", "Postman", "Git", "Vercel", "Figma"],
    certificate: true,
    projects: 8,
    popular: true,
    category: "Web Development",
  },
  {
    id: "python-programming",
    title: "Python Programming",
    shortDescription: "Learn Python from scratch with hands-on projects in web development, automation, and data analysis.",
    fullDescription: "Master Python programming language from fundamentals to advanced concepts. This comprehensive course covers Python syntax, data structures, OOP, file handling, web scraping, automation scripts, and introduction to frameworks like Django and Flask. Perfect for beginners who want to start their programming journey.",
    icon: Terminal,
    gradient: "from-yellow-500 to-green-500",
    duration: "3 Months",
    level: "Beginner",
    mode: ["Online", "Offline", "Hybrid"],
    price: {
      online: 10000,
      offline: 14000,
    },
    curriculum: [
      {
        title: "Module 1: Python Basics",
        topics: ["Python Setup & IDEs", "Variables & Data Types", "Operators & Expressions", "Control Flow"],
      },
      {
        title: "Module 2: Data Structures",
        topics: ["Lists & Tuples", "Dictionaries & Sets", "String Manipulation", "Comprehensions"],
      },
      {
        title: "Module 3: Functions & OOP",
        topics: ["Functions & Lambda", "Modules & Packages", "Classes & Objects", "Inheritance & Polymorphism"],
      },
      {
        title: "Module 4: Advanced Topics",
        topics: ["File Handling", "Exception Handling", "Regular Expressions", "Decorators & Generators"],
      },
      {
        title: "Module 5: Practical Applications",
        topics: ["Web Scraping", "Automation Scripts", "API Integration", "Introduction to Django/Flask"],
      },
    ],
    features: [
      "Beginner-friendly approach",
      "Hands-on coding exercises",
      "Real-world projects",
      "Interview preparation",
      "Community support",
    ],
    tools: ["Python", "PyCharm", "Jupyter Notebook", "Git", "VS Code"],
    certificate: true,
    projects: 6,
    popular: true,
    category: "Programming",
  },
  {
    id: "sql-database",
    title: "SQL & Database Management",
    shortDescription: "Master SQL queries, database design, and management with MySQL, PostgreSQL, and MongoDB.",
    fullDescription: "Comprehensive database course covering relational and NoSQL databases. Learn SQL fundamentals, complex queries, database design principles, normalization, indexing, stored procedures, and database administration. Also includes introduction to NoSQL databases like MongoDB for modern application needs.",
    icon: Database,
    gradient: "from-orange-500 to-red-500",
    duration: "2.5 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    price: {
      online: 8000,
      offline: 11000,
    },
    curriculum: [
      {
        title: "Module 1: Database Fundamentals",
        topics: ["Introduction to Databases", "RDBMS Concepts", "ER Diagrams", "Normalization"],
      },
      {
        title: "Module 2: SQL Basics",
        topics: ["SELECT Statements", "WHERE & Filtering", "JOINs (INNER, LEFT, RIGHT)", "GROUP BY & Aggregations"],
      },
      {
        title: "Module 3: Advanced SQL",
        topics: ["Subqueries", "Window Functions", "CTEs", "Stored Procedures", "Triggers"],
      },
      {
        title: "Module 4: Database Administration",
        topics: ["User Management", "Backup & Recovery", "Performance Tuning", "Indexing Strategies"],
      },
      {
        title: "Module 5: NoSQL Introduction",
        topics: ["MongoDB Basics", "Document-based Design", "CRUD Operations", "When to Use NoSQL"],
      },
    ],
    features: [
      "Practical database projects",
      "Real company scenarios",
      "Performance optimization",
      "DBA fundamentals",
    ],
    tools: ["MySQL", "PostgreSQL", "MongoDB", "DBeaver", "pgAdmin"],
    certificate: true,
    projects: 5,
    popular: true,
    category: "Database",
  },
  {
    id: "react-native",
    title: "React Native Mobile Development",
    shortDescription: "Build cross-platform iOS and Android apps using React Native and JavaScript.",
    fullDescription: "Learn to build native mobile applications for both iOS and Android using React Native. This course covers React Native fundamentals, navigation, state management, native modules, API integration, push notifications, and app store deployment. Build real-world apps and launch them on app stores.",
    icon: Smartphone,
    gradient: "from-blue-500 to-purple-600",
    duration: "3.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline", "Hybrid"],
    price: {
      online: 14000,
      offline: 18000,
    },
    curriculum: [
      {
        title: "Module 1: React Native Basics",
        topics: ["Environment Setup", "Core Components", "Styling & Layout", "Flexbox"],
      },
      {
        title: "Module 2: Navigation & State",
        topics: ["React Navigation", "Stack & Tab Navigators", "Context API", "Redux Integration"],
      },
      {
        title: "Module 3: Native Features",
        topics: ["Camera & Gallery", "Location Services", "Push Notifications", "Local Storage"],
      },
      {
        title: "Module 4: API & Backend",
        topics: ["REST API Integration", "Authentication", "Firebase Integration", "Real-time Features"],
      },
      {
        title: "Module 5: Deployment",
        topics: ["App Optimization", "iOS App Store", "Google Play Store", "CI/CD for Mobile"],
      },
    ],
    features: [
      "Build 3 complete apps",
      "App store deployment guide",
      "Cross-platform expertise",
      "Industry best practices",
    ],
    tools: ["React Native", "Expo", "Android Studio", "Xcode", "Firebase"],
    certificate: true,
    projects: 5,
    popular: true,
    category: "Mobile Development",
  },
  {
    id: "java-programming",
    title: "Java Programming & DSA",
    shortDescription: "Master Java programming with Data Structures and Algorithms for placements and development.",
    fullDescription: "Comprehensive Java course covering core Java, OOP concepts, collections framework, multithreading, and Data Structures & Algorithms. This course prepares you for technical interviews, competitive programming, and enterprise Java development. Perfect for students preparing for placements.",
    icon: Cpu,
    gradient: "from-red-500 to-orange-500",
    duration: "4 Months",
    level: "Beginner",
    mode: ["Online", "Offline", "Hybrid"],
    price: {
      online: 12000,
      offline: 16000,
    },
    curriculum: [
      {
        title: "Module 1: Java Fundamentals",
        topics: ["JDK Setup", "Data Types & Variables", "Operators", "Control Statements"],
      },
      {
        title: "Module 2: OOP in Java",
        topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Abstraction & Interfaces"],
      },
      {
        title: "Module 3: Advanced Java",
        topics: ["Collections Framework", "Exception Handling", "Multithreading", "File I/O"],
      },
      {
        title: "Module 4: Data Structures",
        topics: ["Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees & Graphs"],
      },
      {
        title: "Module 5: Algorithms",
        topics: ["Sorting Algorithms", "Searching Algorithms", "Dynamic Programming", "Interview Problems"],
      },
    ],
    features: [
      "Placement-focused curriculum",
      "500+ coding problems",
      "Mock interviews",
      "Resume building",
    ],
    tools: ["Java JDK", "IntelliJ IDEA", "Eclipse", "LeetCode", "HackerRank"],
    certificate: true,
    projects: 4,
    popular: false,
    category: "Programming",
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud Computing",
    shortDescription: "Learn DevOps practices, CI/CD, Docker, Kubernetes, and AWS/Azure cloud services.",
    fullDescription: "Master modern DevOps practices and cloud computing technologies. This course covers Linux administration, version control, containerization with Docker, orchestration with Kubernetes, CI/CD pipelines, infrastructure as code, and major cloud platforms (AWS, Azure, GCP). Prepare for DevOps engineer roles.",
    icon: Cloud,
    gradient: "from-purple-500 to-indigo-600",
    duration: "4 Months",
    level: "Intermediate",
    mode: ["Online", "Hybrid"],
    price: {
      online: 18000,
      offline: 24000,
    },
    curriculum: [
      {
        title: "Module 1: Linux & Scripting",
        topics: ["Linux Administration", "Bash Scripting", "Shell Commands", "System Monitoring"],
      },
      {
        title: "Module 2: Version Control & CI/CD",
        topics: ["Git Advanced", "GitHub Actions", "Jenkins", "GitLab CI"],
      },
      {
        title: "Module 3: Containerization",
        topics: ["Docker Fundamentals", "Docker Compose", "Container Networks", "Image Optimization"],
      },
      {
        title: "Module 4: Orchestration",
        topics: ["Kubernetes Basics", "Deployments & Services", "Helm Charts", "Monitoring & Logging"],
      },
      {
        title: "Module 5: Cloud Platforms",
        topics: ["AWS Services", "Azure Basics", "Infrastructure as Code", "Terraform"],
      },
    ],
    features: [
      "Hands-on labs",
      "Real infrastructure projects",
      "Cloud certifications prep",
      "Industry mentorship",
    ],
    tools: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Prometheus"],
    certificate: true,
    projects: 6,
    popular: true,
    category: "DevOps & Cloud",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Learn user interface and experience design using Figma, Adobe XD, and design principles.",
    fullDescription: "Comprehensive UI/UX design course covering design thinking, user research, wireframing, prototyping, and visual design. Master industry-standard tools like Figma and Adobe XD. Learn to create user-centered designs that convert and delight users. Perfect for aspiring product designers.",
    icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    duration: "3 Months",
    level: "Beginner",
    mode: ["Online", "Offline", "Hybrid"],
    price: {
      online: 12000,
      offline: 15000,
    },
    curriculum: [
      {
        title: "Module 1: Design Fundamentals",
        topics: ["Design Principles", "Color Theory", "Typography", "Layout & Grid Systems"],
      },
      {
        title: "Module 2: UX Research",
        topics: ["User Research Methods", "Personas & User Journey", "Information Architecture", "Usability Testing"],
      },
      {
        title: "Module 3: UI Design Tools",
        topics: ["Figma Mastery", "Components & Variants", "Auto Layout", "Design Systems"],
      },
      {
        title: "Module 4: Prototyping",
        topics: ["Interactive Prototypes", "Micro-interactions", "Animation Principles", "Handoff to Developers"],
      },
      {
        title: "Module 5: Portfolio",
        topics: ["Case Study Creation", "Portfolio Website", "Design Presentation", "Client Communication"],
      },
    ],
    features: [
      "Portfolio-ready projects",
      "Real client projects",
      "Design critique sessions",
      "Industry networking",
    ],
    tools: ["Figma", "Adobe XD", "Sketch", "Principle", "Notion", "Miro"],
    certificate: true,
    projects: 6,
    popular: true,
    category: "Design",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Fundamentals",
    shortDescription: "Learn ethical hacking, network security, and cybersecurity best practices.",
    fullDescription: "Comprehensive cybersecurity course covering network security, ethical hacking, penetration testing, security protocols, and compliance. Learn to identify vulnerabilities, protect systems, and respond to security incidents. Prepare for certifications like CEH and CompTIA Security+.",
    icon: Shield,
    gradient: "from-green-500 to-emerald-600",
    duration: "4 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    price: {
      online: 16000,
      offline: 22000,
    },
    curriculum: [
      {
        title: "Module 1: Security Basics",
        topics: ["Security Concepts", "Cryptography", "Network Fundamentals", "Security Protocols"],
      },
      {
        title: "Module 2: Ethical Hacking",
        topics: ["Reconnaissance", "Scanning & Enumeration", "Vulnerability Assessment", "Exploitation Basics"],
      },
      {
        title: "Module 3: Network Security",
        topics: ["Firewalls & IDS", "VPN & Encryption", "Wireless Security", "Network Monitoring"],
      },
      {
        title: "Module 4: Application Security",
        topics: ["Web App Security", "OWASP Top 10", "SQL Injection", "XSS & CSRF"],
      },
      {
        title: "Module 5: Incident Response",
        topics: ["Threat Detection", "Incident Handling", "Digital Forensics", "Compliance & Governance"],
      },
    ],
    features: [
      "CTF challenges",
      "Virtual labs",
      "Certification prep",
      "Industry case studies",
    ],
    tools: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Nmap"],
    certificate: true,
    projects: 5,
    popular: false,
    category: "Programming",
  },
  {
    id: "data-science",
    title: "Data Science & Machine Learning",
    shortDescription: "Master data analysis, visualization, and machine learning with Python.",
    fullDescription: "Comprehensive data science course covering statistics, data analysis, visualization, and machine learning. Learn Python libraries like NumPy, Pandas, Matplotlib, and Scikit-learn. Build predictive models and gain insights from data. Perfect for aspiring data scientists and analysts.",
    icon: Brain,
    gradient: "from-violet-500 to-purple-600",
    duration: "5 Months",
    level: "Intermediate",
    mode: ["Online", "Hybrid"],
    price: {
      online: 20000,
      offline: 28000,
    },
    curriculum: [
      {
        title: "Module 1: Python for Data Science",
        topics: ["NumPy", "Pandas", "Data Manipulation", "Data Cleaning"],
      },
      {
        title: "Module 2: Statistics & Math",
        topics: ["Descriptive Statistics", "Probability", "Hypothesis Testing", "Linear Algebra Basics"],
      },
      {
        title: "Module 3: Data Visualization",
        topics: ["Matplotlib", "Seaborn", "Plotly", "Dashboard Creation"],
      },
      {
        title: "Module 4: Machine Learning",
        topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
      },
      {
        title: "Module 5: Advanced ML",
        topics: ["Deep Learning Intro", "Neural Networks", "NLP Basics", "ML Deployment"],
      },
    ],
    features: [
      "Real datasets",
      "Kaggle competitions",
      "Industry projects",
      "Career guidance",
    ],
    tools: ["Python", "Jupyter", "TensorFlow", "Scikit-learn", "Tableau", "SQL"],
    certificate: true,
    projects: 8,
    popular: true,
    category: "Data Science",
  },
  {
    id: "next-js",
    title: "Next.js Full Stack Development",
    shortDescription: "Build production-ready React applications with Next.js, API routes, and deployment.",
    fullDescription: "Master Next.js framework for building production-ready React applications. Learn server-side rendering, static generation, API routes, authentication, database integration, and deployment. This course covers the latest Next.js features including App Router, Server Components, and Server Actions.",
    icon: Layers,
    gradient: "from-gray-600 to-gray-800",
    duration: "2.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    price: {
      online: 12000,
      offline: 15000,
    },
    curriculum: [
      {
        title: "Module 1: Next.js Fundamentals",
        topics: ["App Router", "File-based Routing", "Layouts & Pages", "Server vs Client Components"],
      },
      {
        title: "Module 2: Data Fetching",
        topics: ["Server Components", "Client Components", "Caching Strategies", "Revalidation"],
      },
      {
        title: "Module 3: Backend Features",
        topics: ["API Routes", "Server Actions", "Middleware", "Authentication"],
      },
      {
        title: "Module 4: Database & ORM",
        topics: ["Prisma ORM", "Database Design", "CRUD Operations", "Relationships"],
      },
      {
        title: "Module 5: Production",
        topics: ["Performance Optimization", "SEO", "Deployment", "Monitoring"],
      },
    ],
    features: [
      "Latest Next.js 14 features",
      "Full stack projects",
      "Performance optimization",
      "Industry best practices",
    ],
    tools: ["Next.js", "React", "Prisma", "Vercel", "PostgreSQL", "TailwindCSS"],
    certificate: true,
    projects: 4,
    popular: true,
    category: "Web Development",
  },
  {
    id: "flutter",
    title: "Flutter App Development",
    shortDescription: "Build beautiful cross-platform mobile apps with Flutter and Dart.",
    fullDescription: "Learn Flutter framework and Dart programming to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. This course covers widgets, state management, animations, Firebase integration, and app store deployment.",
    icon: Smartphone,
    gradient: "from-blue-400 to-cyan-500",
    duration: "3.5 Months",
    level: "Beginner",
    mode: ["Online", "Offline", "Hybrid"],
    price: {
      online: 14000,
      offline: 18000,
    },
    curriculum: [
      {
        title: "Module 1: Dart & Flutter Basics",
        topics: ["Dart Programming", "Flutter Setup", "Widgets", "Layouts"],
      },
      {
        title: "Module 2: State Management",
        topics: ["setState", "Provider", "Riverpod", "BLoC Pattern"],
      },
      {
        title: "Module 3: UI & Animations",
        topics: ["Custom Widgets", "Animations", "Gestures", "Responsive Design"],
      },
      {
        title: "Module 4: Backend Integration",
        topics: ["REST APIs", "Firebase", "Local Storage", "Authentication"],
      },
      {
        title: "Module 5: Deployment",
        topics: ["App Optimization", "Play Store", "App Store", "CI/CD"],
      },
    ],
    features: [
      "Cross-platform development",
      "Beautiful UI designs",
      "Real app projects",
      "Store deployment",
    ],
    tools: ["Flutter", "Dart", "Android Studio", "VS Code", "Firebase", "Figma"],
    certificate: true,
    projects: 5,
    popular: true,
    category: "Mobile Development",
  },
  {
    id: "git-github",
    title: "Git & GitHub Mastery",
    shortDescription: "Master version control with Git and collaboration with GitHub for team projects.",
    fullDescription: "Complete Git and GitHub course covering version control fundamentals, branching strategies, merge conflicts, pull requests, code reviews, GitHub Actions, and team collaboration workflows. Essential skills for any developer working in a team environment.",
    icon: GitBranch,
    gradient: "from-gray-500 to-gray-700",
    duration: "1 Month",
    level: "Beginner",
    mode: ["Online", "Offline"],
    price: {
      online: 3000,
      offline: 4500,
    },
    curriculum: [
      {
        title: "Module 1: Git Basics",
        topics: ["Git Installation", "Basic Commands", "Staging & Commits", "Git History"],
      },
      {
        title: "Module 2: Branching",
        topics: ["Branch Creation", "Merging", "Rebasing", "Conflict Resolution"],
      },
      {
        title: "Module 3: GitHub",
        topics: ["Remote Repositories", "Pull Requests", "Code Reviews", "Issues & Projects"],
      },
      {
        title: "Module 4: Advanced",
        topics: ["GitHub Actions", "Branch Protection", "Git Hooks", "GitFlow"],
      },
    ],
    features: [
      "Practical exercises",
      "Team simulation",
      "Industry workflows",
      "Quick completion",
    ],
    tools: ["Git", "GitHub", "VS Code", "GitHub Desktop"],
    certificate: true,
    projects: 2,
    popular: false,
    category: "Programming",
  },
];

export const applicationProcess = [
  {
    step: 1,
    title: "Choose Your Course",
    description: "Browse our courses and select the one that matches your career goals.",
    icon: "search",
  },
  {
    step: 2,
    title: "Fill Application Form",
    description: "Complete the online application form with your details and preferred batch timing.",
    icon: "form",
  },
  {
    step: 3,
    title: "Counseling Session",
    description: "Attend a free counseling session to discuss your goals and course details.",
    icon: "chat",
  },
  {
    step: 4,
    title: "Payment & Enrollment",
    description: "Complete the payment and get enrolled. Start your learning journey!",
    icon: "check",
  },
];

export const classOptions = {
  online: {
    title: "Online Classes",
    description: "Learn from anywhere with live interactive sessions",
    features: [
      "Live classes via Zoom/Meet",
      "Recorded sessions for revision",
      "Screen sharing & doubt solving",
      "Flexible timings available",
      "Same curriculum as offline",
      "24/7 access to materials",
    ],
  },
  offline: {
    title: "Offline Classes",
    description: "In-person learning at our training center",
    features: [
      "Face-to-face instruction",
      "Dedicated lab facilities",
      "Peer learning environment",
      "Direct mentor access",
      "Networking opportunities",
      "Library & resources access",
    ],
  },
  hybrid: {
    title: "Hybrid Mode",
    description: "Best of both worlds - online and offline combined",
    features: [
      "Flexible attendance options",
      "Switch between modes",
      "Weekend offline sessions",
      "Weekday online classes",
      "Project work in labs",
      "Maximum flexibility",
    ],
  },
};
