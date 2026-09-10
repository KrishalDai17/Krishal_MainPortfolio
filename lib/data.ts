// ============================================================
// SITE DATA — Core data models & static fallback content.
// Everything here matches the live site and database models.
// ============================================================

export interface ProfileLink {
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  designation: string;
  roles: string[];
  location: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  links: ProfileLink;
  tagline: [string, string];
  subTagline: string[];
  supportingStatement: string;
  heroSupport: string;
  roleBadges: string[];
  heroCtas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
    github: { label: string; href: string };
  };
}

export const profile: Profile = {
  name: "Krishal Shrestha",
  firstName: "Krishal",
  lastName: "Shrestha",
  initials: "KS.",
  designation: "Software Developer · QA Engineer · IT Professional",
  roles: [
    "Software Developer",
    "QA Engineer",
    "IT Professional",
    "Creative Photographer",
  ],
  location: "Kathmandu, Nepal",
  phone: "9864029898",
  email: "krishalstha87@gmail.com",
  avatarUrl: "/images/krishal-profile.png",
  links: {
    github: "https://github.com/KrishalDai17",
    linkedin: "https://www.linkedin.com/in/krishal-shrestha",
    facebook: "https://www.facebook.com/unique.krishal.17",
    instagram: "https://www.instagram.com/only__krishal/",
    whatsapp: "https://wa.me/9779864029898",
  },
  tagline: ["ENGINEER BY LOGIC.", "CREATOR BY VISION."],
  subTagline: ["BUILD.", "TEST.", "CREATE.", "CAPTURE."],
  supportingStatement:
    "Technology solves problems. Creativity gives them meaning.",
  heroSupport:
    "Building useful digital experiences with logic, technology and creativity.",
  roleBadges: [
    "SOFTWARE DEVELOPER",
    "FULL-STACK",
    "DATABASE",
    "UI/UX",
    "CREATIVE PHOTOGRAPHER",
  ],
  heroCtas: {
    primary: { label: "VIEW MY PROJECTS", href: "#projects" },
    secondary: { label: "EXPLORE PHOTOGRAPHY", href: "/photography" },
    github: { label: "GITHUB REPOSITORY", href: "https://github.com/KrishalDai17" },
  },
};

export const roleBadges = profile.roleBadges;
export const hudCycle = ["BUILD", "TEST", "DATA", "DESIGN", "CAPTURE"];

export interface NavItem {
  label: string;
  href: string;
}

export const navLinks: NavItem[] = [
  { label: "HOME", href: "/#home" },
  { label: "ABOUT", href: "/#about" },
  { label: "SKILLS", href: "/#skills" },
  { label: "PROJECTS", href: "/#projects" },
  { label: "PHOTOGRAPHY", href: "/photography" },
  { label: "EDUCATION", href: "/#education" },
  { label: "CONTACT", href: "/#contact" },
];

export const aboutIntro = [
  "I am a Computer Engineering undergraduate with practical experience in full-stack software development, database architecture, UI/UX design, and digital operations.",
  "Alongside technology, I work in photography and videography, which has strengthened my attention to detail, visual thinking, communication, and storytelling.",
  "I enjoy understanding how systems work, finding where they break, improving them, and creating experiences that people actually enjoy using.",
];

export const careerSummary =
  "Driven by engineering precision and artistic curiosity, I bridge full-cycle software development with clean design and creative media production.";

export const aboutHighlights = [
  "Software Development",
  "Full-Stack Web",
  "Database Engineering",
  "UI/UX Design",
  "REST APIs",
  "Creative Photography",
];

export interface WhatIDoItem {
  title: string;
  description: string;
  category: string;
}

export const whatIDoItems: WhatIDoItem[] = [
  {
    title: "Software & Web Development",
    description: "Building responsive, modern applications with clean architecture using JavaScript, TypeScript, Python, PHP, Next.js, and Node.js.",
    category: "ENGINEERING",
  },
  {
    title: "Database Modeling & Backend",
    description: "Structuring relational databases in MySQL and PostgreSQL, writing queries, and building secure REST APIs.",
    category: "DATA",
  },
  {
    title: "UI/UX & Modern Frontend",
    description: "Crafting intuitive, accessible, and fast user interfaces with Tailwind CSS, Figma, and component-driven architecture.",
    category: "DESIGN",
  },
  {
    title: "Creative Photography & Storytelling",
    description: "Approaching problems with visual perspective through portrait, landscape, and street photography, capturing real moments with intent.",
    category: "CREATIVE",
  },
];

export const identityCards = [
  {
    index: "01",
    title: "ENGINEER",
    description: "Building practical software and solving technical problems.",
  },
  {
    index: "02",
    title: "BUILDER",
    description: "Turning ideas into functional applications.",
  },
  {
    index: "03",
    title: "DESIGNER",
    description: "Designing sleek, intuitive, and accessible user experiences.",
  },
  {
    index: "04",
    title: "CREATOR",
    description: "Photography, videography and visual storytelling.",
  },
];

export const personalIdentityWords = [
  "I BUILD.",
  "I TEST.",
  "I ORGANIZE.",
  "I DESIGN.",
  "I CAPTURE.",
];

// ------------------------------------------------------------
// SKILLS — "Capability Matrix"
// ------------------------------------------------------------
export type SkillLevel =
  | "PRACTICAL EXPERIENCE"
  | "WORKING KNOWLEDGE"
  | "FAMILIAR"
  | "CURRENTLY LEARNING";

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  label: string;
  items: SkillItem[];
}

export interface SkillCategory {
  id: string;
  tab: string;
  index: string;
  title: string;
  groups: SkillGroup[];
}

const exp = (name: string): SkillItem => ({ name, level: "PRACTICAL EXPERIENCE" });
const work = (name: string): SkillItem => ({ name, level: "WORKING KNOWLEDGE" });
const fam = (name: string): SkillItem => ({ name, level: "FAMILIAR" });

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    tab: "PROGRAMMING",
    index: "01",
    title: "PROGRAMMING LANGUAGES",
    groups: [
      {
        label: "Core Languages",
        items: [
          exp("C"),
          exp("C++"),
          work("Java"),
          exp("JavaScript"),
          exp("TypeScript"),
          exp("Python"),
          work("PHP"),
          work("Dart"),
        ],
      },
    ],
  },
  {
    id: "development",
    tab: "DEVELOPMENT",
    index: "02",
    title: "SOFTWARE & WEB DEVELOPMENT",
    groups: [
      {
        label: "Frontend",
        items: [
          exp("HTML5"),
          exp("CSS3"),
          work("Bootstrap"),
          exp("Responsive Design"),
          exp("UI Components"),
        ],
      },
      {
        label: "Backend & Frameworks",
        items: [
          work("Flask"),
          work("Node.js"),
          work("Express.js"),
          work("Flutter"),
          exp("REST APIs"),
        ],
      },
    ],
  },
  {
    id: "database",
    tab: "DATABASE",
    index: "03",
    title: "DATABASES & DATA MANAGEMENT",
    groups: [
      {
        label: "Database Systems",
        items: [
          work("MySQL"),
          work("PostgreSQL"),
          work("SQL"),
          fam("MongoDB"),
          work("SQLite"),
        ],
      },
      {
        label: "Data Operations",
        items: [
          exp("Database Validation"),
          exp("CRUD Operations"),
          exp("Data Cleaning"),
          exp("Data Organization"),
        ],
      },
    ],
  },
  {
    id: "tools",
    tab: "TOOLS",
    index: "04",
    title: "ENGINEERING TOOLS & WORKFLOW",
    groups: [
      {
        label: "Productivity & Version Control",
        items: [
          exp("Git"),
          exp("GitHub"),
          exp("VS Code"),
          work("Postman"),
          work("Jira"),
          exp("Microsoft Excel"),
        ],
      },
    ],
  },
  {
    id: "design",
    tab: "DESIGN",
    index: "05",
    title: "UI/UX & DESIGN",
    groups: [
      {
        label: "Design Systems & Prototyping",
        items: [
          work("Figma"),
          exp("UI/UX Principles"),
          exp("Responsive Design"),
          exp("Wireframing"),
          exp("Canva"),
        ],
      },
    ],
  },
  {
    id: "creative",
    tab: "CREATIVE MEDIA",
    index: "06",
    title: "PHOTOGRAPHY & VISUAL STORYTELLING",
    groups: [
      {
        label: "Photography",
        items: [
          exp("Portrait Photography"),
          exp("Event Photography"),
          exp("Landscape Photography"),
          work("Street Photography"),
          exp("Composition & Lighting"),
          exp("Photo Editing (Lightroom)"),
        ],
      },
      {
        label: "Motion & Videography",
        items: [
          exp("Event Videography"),
          work("Cinematic Framing"),
          work("Video Editing"),
        ],
      },
    ],
  },
];

// ------------------------------------------------------------
// PROJECTS — Rich portfolio projects
// ------------------------------------------------------------
export interface Project {
  id?: string;
  index: string;
  name: string;
  slug: string;
  category: string;
  status: "COMPLETED" | "ACTIVE" | "IN PROGRESS";
  featured: boolean;
  shortDescription: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technicalImplementation: string;
  myContribution: string;
  challenges: string;
  challengesSolutions: string;
  technology: string[];
  github?: string;
  demo?: string;
  coverImageUrl?: string;
  screenshots: string[];
}

export const projectCategories = [
  "ALL",
  "WEB",
  "MOBILE",
  "E-COMMERCE",
  "DATABASE",
];

export const projects: Project[] = [
  {
    index: "01",
    name: "DD MART",
    slug: "dd-mart",
    category: "WEB",
    status: "COMPLETED",
    featured: true,
    shortDescription:
      "Modern retail & grocery e-commerce platform designed with real-time cart management, categorized product catalog, and seamless checkout operations.",
    description:
      "A full-featured digital retail web application built to streamline grocery shopping and supermarket operations. Featuring responsive product browsing, dynamic inventory status, search filtering, and orders management.",
    overview:
      "DD Mart is an intuitive e-commerce web platform engineered for modern retail convenience. Designed with a mobile-first philosophy, it enables customers to browse diverse grocery categories, manage active cart items, and complete orders while providing store administrators with an organized inventory management dashboard.",
    problem:
      "Traditional neighborhood retail supermarkets face challenges managing fast-moving stock, keeping inventory counts synchronized, and providing a fast, effortless digital ordering experience for local customers.",
    solution:
      "Engineered a responsive e-commerce web platform featuring an interactive product catalog with search and category filters, local state cart management, order submission pipeline, and an administrative inventory control system.",
    features: [
      "Categorized Grocery & Household Product Catalog",
      "Real-Time Shopping Cart with Dynamic Quantity Controls",
      "Instant Search with Multi-Category Filtering",
      "Streamlined Order Placement & Checkout Workflow",
      "Admin Inventory & Price Management Dashboard",
      "Fully Responsive Mobile-First Interface",
    ],
    technicalImplementation:
      "Developed with modern web technologies, modular component architecture, responsive Tailwind styling, REST API integrations, and robust database models for products, categories, and orders.",
    myContribution:
      "Full-stack developer responsible for UI/UX interface design, state management implementation for the cart, backend CRUD endpoints, and database schema structuring.",
    challenges:
      "Maintaining cart state consistency across page refreshes and ensuring rapid load times for high-resolution product imagery.",
    challengesSolutions:
      "Utilized persistent local storage synchronization for cart data and implemented lazy-loaded, CDN-optimized image delivery.",
    technology: [
      "React",
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "MySQL",
    ],
    github: "https://github.com/KrishalDai17",
    demo: "/projects/dd-mart",
    coverImageUrl:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    index: "02",
    name: "CNP EXPLORE",
    slug: "cnp-explore",
    category: "MOBILE",
    status: "COMPLETED",
    featured: true,
    shortDescription:
      "Cross-platform mobile application engineered to provide an interactive exploration experience for Chitwan National Park visitors and wildlife enthusiasts.",
    description:
      "A cross-platform mobile application providing comprehensive tourism guidance, interactive biodiversity maps, safari booking information, and wildlife identification guides.",
    overview:
      "CNP Explore delivers an offline-friendly, high-performance mobile companion for visitors exploring Chitwan National Park, showcasing fauna, flora, cultural trails, and emergency contact directories.",
    problem:
      "Tourists and researchers exploring the national park frequently face low cellular connectivity and struggle to find reliable, centralized information on wildlife sightings, trail routes, and safety guidelines.",
    solution:
      "Engineered a Flutter mobile application with responsive state management, offline caching for essential directories, and an intuitive UI optimized for both budget Android smartphones and iOS devices.",
    features: [
      "Interactive Biodiversity & Wildlife Species Guide",
      "Offline Caching of Safety Guidelines & Key Contact Directories",
      "Safari Itinerary & Route Exploration",
      "Responsive Touch-Optimized Layouts across all screen densities",
      "Interactive Media Gallery showcasing park flora & fauna",
    ],
    technicalImplementation:
      "Built using Flutter SDK and Dart, leveraging provider-based state management, custom vector graphics, caching layers for network media, and localized navigation stacks.",
    myContribution:
      "Designed UI/UX mockups, built client-side Flutter components, implemented mobile layout responsiveness, and verified cross-device performance.",
    challenges:
      "Ensuring smooth 60fps scrolling and rapid image rendering on low-spec mobile devices with constrained memory.",
    challengesSolutions:
      "Utilized Flutter cached network image caching strategies and memoized list item builders to minimize garbage collection pauses.",
    technology: ["Flutter", "Dart", "Android", "iOS", "Mobile UI/UX"],
    github: "https://github.com/KrishalDai17",
    demo: "/projects/cnp-explore",
    coverImageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    index: "03",
    name: "SIGNUP AUTHENTICATION SYSTEM",
    slug: "signup-authentication-system",
    category: "WEB",
    status: "COMPLETED",
    featured: true,
    shortDescription:
      "Production-grade authentication engine featuring salted Bcrypt password hashing, session tokens, validation middleware, and accessible ShadCN UI.",
    description:
      "A secure authentication system implementing rigorous user registration, cryptographic password hashing, role-based session controls, and modern UI components.",
    overview:
      "Engineered as a reusable security foundation for modern web applications, this project focuses on preventing OWASP authentication vulnerabilities, implementing strict password complexity validation, and delivering a modern user interface.",
    problem:
      "Many web applications suffer from insecure authentication pipelines, exposing plain credentials, vulnerable endpoints, and poorly sanitized forms.",
    solution:
      "Implemented multi-layered validation middleware, bcrypt salted hashing (12 salt rounds), secure token handling, and clear feedback states built on accessible ShadCN and Tailwind components.",
    features: [
      "Cryptographic Password Hashing with Bcrypt and Salt Rounds",
      "Comprehensive Client & Server-side Form Validation",
      "Protected Routes and Authentication Middleware",
      "User Session Management & Secure Token Handlers",
      "Accessible, Modern UI with ShadCN / Tailwind styling",
    ],
    technicalImplementation:
      "Developed with Node.js, Express, MongoDB/Mongoose, Bcrypt, and modern React/Next.js frontend with Tailwind CSS and Radix/ShadCN UI primitives.",
    myContribution:
      "Architected the backend security validation middleware, configured database schema indices, and integrated responsive authentication views.",
    challenges:
      "Handling brute-force login attempts and preventing timing attacks on password verification.",
    challengesSolutions:
      "Implemented constant-time cryptographic comparisons and rate-limiting middleware to throttle repeated failed attempts.",
    technology: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Bcrypt",
      "Tailwind CSS",
      "ShadCN UI",
    ],
    github: "https://github.com/KrishalDai17",
    demo: "/projects/signup-authentication-system",
    coverImageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    ],
  },
];

// ------------------------------------------------------------
// PHOTOGRAPHY ALBUMS & GALLERY
// ------------------------------------------------------------
export interface PhotographyAlbum {
  id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImageUrl: string;
  photoCount?: number;
}

export const photographyAlbums: PhotographyAlbum[] = [
  {
    title: "Kathmandu Street Photography",
    slug: "kathmandu-street-photography",
    category: "STREET",
    description:
      "Candid moments, historic alleyways, and living culture across the historic courtyards and vibrant streets of Kathmandu Valley.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    photoCount: 8,
  },
  {
    title: "Portrait Collection",
    slug: "portrait-collection",
    category: "PORTRAITS",
    description:
      "Character-driven portraiture focusing on authentic expressions, natural lighting, and emotional connection.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    photoCount: 6,
  },
  {
    title: "Event Photography",
    slug: "event-photography",
    category: "EVENTS",
    description:
      "Dynamic visual documentary of celebrations, collegiate festivals, conferences, and ceremonial gatherings.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    photoCount: 7,
  },
  {
    title: "Travel & Landscapes",
    slug: "travel-and-landscapes",
    category: "LANDSCAPES",
    description:
      "Breathtaking vistas, Himalayan horizons, and serene natural terrain across Nepal's diverse topography.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    photoCount: 6,
  },
  {
    title: "Creative Portraits & Concepts",
    slug: "creative-portraits",
    category: "PORTRAITS",
    description:
      "Conceptual lighting, cinematic mood, and experimental framing exploring visual perspectives beyond the conventional.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    photoCount: 5,
  },
];

export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  albumSlug?: string;
  description: string;
  location?: string;
  dateTaken?: string;
  imageUrl?: string;
  altText?: string;
  featured?: boolean;
}

export const photoCategories = [
  "ALL",
  "PORTRAITS",
  "EVENTS",
  "LANDSCAPES",
  "STREET",
  "LIFESTYLE",
  "PRODUCTS",
];

export const photoItems: PhotoItem[] = [
  {
    id: "p1",
    title: "Morning Light at Bhaktapur",
    category: "STREET",
    albumSlug: "kathmandu-street-photography",
    description: "Golden hour illumination piercing through heritage alleyways in historic Bhaktapur.",
    location: "Bhaktapur Durbar Square",
    dateTaken: "2024",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80",
    altText: "Historic Kathmandu street in morning light",
    featured: true,
  },
  {
    id: "p2",
    title: "Soul of the Artisan",
    category: "PORTRAITS",
    albumSlug: "portrait-collection",
    description: "Candid portrait capturing an elderly potter crafting clay vessels at pottery square.",
    location: "Pottery Square, Bhaktapur",
    dateTaken: "2024",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    altText: "Portrait of an artisan",
    featured: true,
  },
  {
    id: "p3",
    title: "Himalayan Ridge at Dawn",
    category: "LANDSCAPES",
    albumSlug: "travel-and-landscapes",
    description: "Panoramic mountain ridges kissed by the first alpine rays of sunrise.",
    location: "Nagarkot, Nepal",
    dateTaken: "2023",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    altText: "Himalayan dawn landscape",
    featured: true,
  },
  {
    id: "p4",
    title: "Festival of Lights & Motion",
    category: "EVENTS",
    albumSlug: "event-photography",
    description: "Vibrant energy and cultural celebrations during evening festivities.",
    location: "Kathmandu Valley",
    dateTaken: "2023",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
    altText: "Event festivities celebration",
    featured: true,
  },
  {
    id: "p5",
    title: "Quiet Solitude",
    category: "PORTRAITS",
    albumSlug: "creative-portraits",
    description: "Cinematic portrait playing with dramatic shadows and minimalist focus.",
    location: "Studio Kathmandu",
    dateTaken: "2024",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    altText: "Creative portrait session",
    featured: true,
  },
  {
    id: "p6",
    title: "Patan Twilight Reverie",
    category: "STREET",
    albumSlug: "kathmandu-street-photography",
    description: "Patan Durbar Square architectural symmetry bathed in blue hour twilight.",
    location: "Patan, Lalitpur",
    dateTaken: "2024",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=80",
    altText: "Patan evening architecture",
    featured: true,
  },
  {
    id: "p7",
    title: "Urban Rhythm & Commute",
    category: "LIFESTYLE",
    albumSlug: "kathmandu-street-photography",
    description: "Daily city life and quiet moments along the urban avenues.",
    location: "Kathmandu",
    dateTaken: "2024",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80",
    altText: "Urban lifestyle commute",
    featured: false,
  },
  {
    id: "p8",
    title: "Misty Pine Forest",
    category: "LANDSCAPES",
    albumSlug: "travel-and-landscapes",
    description: "Ethereal fog blanketing the highland pine ridges after monsoon rains.",
    location: "Shivapuri National Park",
    dateTaken: "2023",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    altText: "Misty pine forest landscape",
    featured: false,
  },
];

// ------------------------------------------------------------
// EDUCATION
// ------------------------------------------------------------
export interface EducationItem {
  period: string;
  institution: string;
  program: string;
  location: string;
  description?: string;
}

export const education: EducationItem[] = [
  {
    period: "2022 — PRESENT",
    institution: "National College of Engineering",
    program: "Bachelor of Computer Engineering",
    location: "Satdobato, Lalitpur",
    description:
      "Rigorous coursework in Data Structures, Algorithms, Software Engineering, Database Systems, and Computer Networks.",
  },
  {
    period: "2020 — 2022",
    institution: "Khwopa Secondary School",
    program: "Higher Secondary Education (+2 Science)",
    location: "Bhaktapur",
    description:
      "Focus on Physics, Mathematics, and Computer Science fundamentals, building analytical reasoning and problem-solving skills.",
  },
];

// ------------------------------------------------------------
// PHILOSOPHY
// ------------------------------------------------------------
export const philosophyWords = [
  "BUILD IT.",
  "TEST IT.",
  "REFINE IT.",
  "CAPTURE IT.",
];

export const philosophyStatement =
  "Whether I am developing software, organizing data, designing an interface, or capturing a moment, I focus on detail, usability and continuous improvement.";

// ------------------------------------------------------------
// SOCIAL LINKS
// ------------------------------------------------------------
export const socialCards = [
  {
    key: "whatsapp",
    label: "WHATSAPP",
    tagline: "Direct instant messaging & quick collaboration.",
    handle: "+977 9864029898",
    url: "https://wa.me/9779864029898",
    cta: "CHAT ON WHATSAPP",
  },
  {
    key: "github",
    label: "GITHUB",
    tagline: "Code I build & open source repositories.",
    handle: "@KrishalDai17",
    url: profile.links.github,
    cta: "VIEW GITHUB",
  },
  {
    key: "linkedin",
    label: "LINKEDIN",
    tagline: "Professional journey & engineering connect.",
    handle: "Krishal Shrestha",
    url: profile.links.linkedin,
    cta: "CONNECT ON LINKEDIN",
  },
  {
    key: "instagram",
    label: "INSTAGRAM",
    tagline: "Frames I capture through my lens.",
    handle: "@only__krishal",
    url: profile.links.instagram,
    cta: "VIEW INSTAGRAM",
  },
  {
    key: "facebook",
    label: "FACEBOOK",
    tagline: "Updates, collaborations and moments.",
    handle: "Krishal Shrestha",
    url: profile.links.facebook,
    cta: "VIEW FACEBOOK",
  },
];

// ------------------------------------------------------------
// CMS Fallbacks for Admin & Secondary Features
// ------------------------------------------------------------
export const qaWorkflow = [
  "REQUIREMENTS",
  "TEST CASE DESIGN",
  "FUNCTIONAL TESTING",
  "API TESTING",
  "DATABASE VALIDATION",
  "BUG REPORTING",
  "REGRESSION TESTING",
  "RELEASE",
];

export const qaCards = [
  "TEST CASE DESIGN",
  "API TESTING",
  "BUG DETECTION",
  "DATABASE VALIDATION",
  "REGRESSION TESTING",
  "SMOKE TESTING",
  "SANITY TESTING",
];

export const qaTools = ["POSTMAN", "GIT", "GITHUB", "SQL", "JIRA", "EXCEL"];

export interface QAProject {
  id?: string;
  title: string;
  project: string;
  testingType: string;
  tools: string[];
  testCases: string;
  bugReports: string;
  apiTesting: string;
  databaseTesting: string;
  result: string;
}

export const qaProjects: QAProject[] = [];

export interface ExperienceItem {
  id?: string;
  company: string;
  position: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export const experience: ExperienceItem[] = [];

export const dataCapabilities = [
  "DATA ENTRY",
  "DATA ORGANIZATION",
  "DATA CLEANING",
  "EXCEL",
  "DATABASE MANAGEMENT",
  "DATABASE VALIDATION",
];

export const dataFlow = [
  "DATA ENTRY",
  "DATA ORGANIZATION",
  "DATABASE",
  "VALIDATION",
];

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}

export const videoItems: VideoItem[] = [];

export type LearningStage = "EXPLORING" | "LEARNING" | "BUILDING";

export const currentLearning: { name: string; stage: LearningStage }[] = [];

export const contributions = [
  {
    title: "SOFTWARE DEVELOPMENT",
    description: "Building responsive, modern applications with clean architecture.",
  },
  {
    title: "DATABASE & API",
    description: "Structuring schemas and integrating secure endpoints.",
  },
  {
    title: "UI/UX DESIGN",
    description: "Designing sleek, accessible user experiences in Figma.",
  },
  {
    title: "PHOTOGRAPHY",
    description: "Capturing authentic visual moments through intentional framing.",
  },
];

export interface SiteSettings {
  availableForOpportunities: boolean;
  footerNote: string;
  introEnabled: boolean;
  introDuration: number;
  introFrequency: "once_per_session" | "always";
  introImageUrl: string;
}

export const siteSettings: SiteSettings = {
  availableForOpportunities: true,
  footerNote: `© 2026 ${profile.name}. All rights reserved.`,
  introEnabled: true,
  introDuration: 3.2,
  introFrequency: "once_per_session",
  introImageUrl: "/images/lakhey-mask-transparent.png",
};
