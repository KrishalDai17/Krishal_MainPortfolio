// ============================================================
// SITE DATA — edit everything here. Nothing below needs touching
// unless you're changing layout/behavior.
// ============================================================

export const profile = {
  name: "Krishal Shrestha",
  firstName: "Krishal",
  lastName: "Shrestha",
  initials: "KS.",
  roles: [
    "Computer Engineering Undergraduate",
    "Software Developer",
    "QA / Software Testing Enthusiast",
    "Data & Digital Operations",
    "Photographer",
    "Videographer",
  ],
  location: "Kathmandu, Nepal",
  phone: "9864029898",
  email: "krishalstha87@gmail.com",
  links: {
    github: "https://github.com/KrishalDai17",
    facebook: "https://www.facebook.com/unique.krishal.17",
    instagram: "https://www.instagram.com/only__krishal/",
    linkedin: "", // [ADD LINKEDIN URL]
  },
  tagline: ["ENGINEER BY LOGIC.", "CREATOR BY VISION."],
  subTagline: ["BUILD.", "TEST.", "CREATE.", "CAPTURE."],
  supportingStatement:
    "Technology solves problems. Creativity gives them meaning.",
  heroSupport:
    "Computer Engineering undergraduate building software, testing systems, working with data, and capturing stories through photography and videography.",
};

export const roleBadges = [
  "SOFTWARE DEVELOPER",
  "QA / TESTING",
  "DATA",
  "UI/UX",
  "PHOTOGRAPHER",
  "VIDEOGRAPHER",
];

export const hudCycle = ["BUILD", "TEST", "DATA", "DESIGN", "CAPTURE"];

export const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "QA", href: "#qa" },
  { label: "CREATIVE", href: "#creative" },
  { label: "EDUCATION", href: "#education" },
  { label: "CONTACT", href: "#contact" },
];

export const aboutIntro = [
  "I am a Computer Engineering undergraduate with practical experience in software development, software quality assurance, database systems, UI/UX, and digital operations.",
  "Alongside technology, I work in photography and videography, which has strengthened my attention to detail, visual thinking, communication, and storytelling.",
  "I enjoy understanding how systems work, finding where they break, improving them, and creating experiences that people actually enjoy using.",
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
    title: "TESTER",
    description: "Finding problems before users do.",
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
    id: "software",
    tab: "SOFTWARE",
    index: "01",
    title: "SOFTWARE DEVELOPMENT",
    groups: [
      {
        label: "Programming",
        items: [exp("C"), exp("C++"), exp("JavaScript"), exp("TypeScript"), exp("Python"), work("PHP"), work("Dart")],
      },
      {
        label: "Frameworks / Libraries",
        items: [work("Flask"), work("Flutter"), work("Bootstrap"), work("Express.js")],
      },
      {
        label: "Frontend",
        items: [exp("HTML5"), exp("CSS3"), work("Bootstrap"), exp("Responsive Design"), exp("UI Components")],
      },
      {
        label: "Backend",
        items: [work("Node.js"), work("Express.js"), work("Flask"), exp("REST APIs")],
      },
    ],
  },
  {
    id: "qa",
    tab: "QA",
    index: "02",
    title: "QUALITY ASSURANCE",
    groups: [
      {
        label: "Testing",
        items: [
          exp("Manual Testing"),
          exp("Functional Testing"),
          exp("Regression Testing"),
          exp("Smoke Testing"),
          exp("Sanity Testing"),
          work("API Testing"),
          work("Postman"),
        ],
      },
      {
        label: "Process",
        items: [exp("Test Case Design"), exp("Bug Reporting"), exp("SDLC"), exp("STLC"), work("Agile/Scrum")],
      },
      {
        label: "Validation",
        items: [work("Database Validation"), exp("Debugging")],
      },
    ],
  },
  {
    id: "data",
    tab: "DATA",
    index: "03",
    title: "DATABASE & DATA",
    groups: [
      {
        label: "Databases",
        items: [work("PostgreSQL"), work("MySQL"), work("SQLite"), fam("MongoDB")],
      },
      {
        label: "Operations",
        items: [
          exp("CRUD"),
          work("Database Validation"),
          exp("Data Entry"),
          exp("Data Cleaning"),
          exp("Data Organization"),
          exp("Spreadsheet Management"),
          exp("Excel"),
          exp("Documentation"),
        ],
      },
    ],
  },
  {
    id: "design",
    tab: "DESIGN",
    index: "04",
    title: "UI/UX",
    groups: [
      {
        label: "Tools & Practice",
        items: [work("Figma"), exp("Canva"), exp("Responsive Design"), work("Wireframing"), exp("UI Components"), work("Visual Design")],
      },
    ],
  },
  {
    id: "creative",
    tab: "CREATIVE",
    index: "05",
    title: "CREATIVE MEDIA",
    groups: [
      {
        label: "Photography",
        items: [
          exp("Portrait Photography"),
          exp("Event Photography"),
          work("Product Photography"),
          exp("Landscape Photography"),
          work("Street Photography"),
          exp("Lifestyle Photography"),
          exp("Composition"),
          exp("Photo Editing"),
        ],
      },
      {
        label: "Videography",
        items: [
          exp("Event Videography"),
          work("Cinematic Video"),
          work("Short-form Video"),
          work("Promotional Video"),
          work("Video Composition"),
          exp("Video Editing"),
          exp("Storytelling"),
        ],
      },
    ],
  },
  {
    id: "tools",
    tab: "TOOLS",
    index: "06",
    title: "TOOLS",
    groups: [
      {
        label: "Everyday Toolkit",
        items: [exp("Git"), exp("GitHub"), exp("VS Code"), work("Postman"), work("Figma"), exp("Canva"), exp("Microsoft Excel")],
      },
    ],
  },
];

// ------------------------------------------------------------
// PROJECTS
// ------------------------------------------------------------
export interface Project {
  index: string;
  name: string;
  technology: string[];
  description: string;
  features: string[];
  github?: string;
  demo?: string;
  coverImageUrl?: string;
}

export const projects: Project[] = [
  {
    index: "01",
    name: "LIBRARY MANAGEMENT SYSTEM",
    technology: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    description:
      "Database-driven library management system designed to simplify book management and student library operations.",
    features: [
      "Book issuing",
      "Book returning",
      "Student registration",
      "Book search",
      "CRUD operations",
      "Database management",
    ],
    github: "https://github.com/KrishalDai17",
  },
  {
    index: "02",
    name: "CNP EXPLORE",
    technology: ["Flutter", "Dart"],
    description:
      "Cross-platform mobile application designed to provide an interactive exploration experience.",
    features: [
      "Responsive mobile interface",
      "Application navigation",
      "User interaction",
      "Android optimization",
    ],
    github: "https://github.com/KrishalDai17",
  },
  {
    index: "03",
    name: "SIGNUP AUTHENTICATION SYSTEM",
    technology: ["JavaScript", "Node.js", "MongoDB", "Bcrypt", "ShadCN UI"],
    description:
      "Secure authentication system with registration, login, password protection and responsive user interfaces.",
    features: [
      "User registration",
      "Login",
      "Password hashing",
      "Bcrypt",
      "Form validation",
      "Responsive authentication UI",
    ],
    github: "https://github.com/KrishalDai17",
  },
];

// ------------------------------------------------------------
// QA SECTION
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

export const qaTools = ["POSTMAN", "GIT", "GITHUB", "SQL", "EXCEL"];

// ------------------------------------------------------------
// DATA & DIGITAL OPERATIONS
// ------------------------------------------------------------
export const dataCapabilities = [
  "DATA ENTRY",
  "DATA ORGANIZATION",
  "DATA CLEANING",
  "EXCEL",
  "DATABASE MANAGEMENT",
  "DATABASE VALIDATION",
  "DOCUMENTATION",
  "INFORMATION MANAGEMENT",
  "ACCURACY CHECKING",
];

export const dataFlow = ["DATA ENTRY", "DATA ORGANIZATION", "DATABASE", "VALIDATION"];

// ------------------------------------------------------------
// PHOTOGRAPHY
// ------------------------------------------------------------
export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  altText?: string;
}

export const photoCategories = [
  "PORTRAITS",
  "EVENTS",
  "LANDSCAPES",
  "PRODUCTS",
  "STREET",
  "LIFESTYLE",
];

export const photoItems: PhotoItem[] = [
  { id: "p1", title: "[ADD IMAGE]", category: "PORTRAITS", description: "[ADD DESCRIPTION]" },
  { id: "p2", title: "[ADD IMAGE]", category: "EVENTS", description: "[ADD DESCRIPTION]" },
  { id: "p3", title: "[ADD IMAGE]", category: "LANDSCAPES", description: "[ADD DESCRIPTION]" },
  { id: "p4", title: "[ADD IMAGE]", category: "PRODUCTS", description: "[ADD DESCRIPTION]" },
  { id: "p5", title: "[ADD IMAGE]", category: "STREET", description: "[ADD DESCRIPTION]" },
  { id: "p6", title: "[ADD IMAGE]", category: "LIFESTYLE", description: "[ADD DESCRIPTION]" },
  { id: "p7", title: "[ADD IMAGE]", category: "PORTRAITS", description: "[ADD DESCRIPTION]" },
  { id: "p8", title: "[ADD IMAGE]", category: "EVENTS", description: "[ADD DESCRIPTION]" },
];

// ------------------------------------------------------------
// VIDEOGRAPHY
// ------------------------------------------------------------
export interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}

export const videoCategories = ["EVENTS", "CINEMATIC", "SHORT FORM", "PROMOTIONAL", "TRAVEL"];

export const videoItems: VideoItem[] = [
  { id: "v1", title: "[ADD PROJECT]", category: "EVENTS", description: "[ADD DESCRIPTION]" },
  { id: "v2", title: "[ADD PROJECT]", category: "CINEMATIC", description: "[ADD DESCRIPTION]" },
  { id: "v3", title: "[ADD PROJECT]", category: "SHORT FORM", description: "[ADD DESCRIPTION]" },
  { id: "v4", title: "[ADD PROJECT]", category: "PROMOTIONAL", description: "[ADD DESCRIPTION]" },
];

// ------------------------------------------------------------
// EDUCATION
// ------------------------------------------------------------
export const education = [
  {
    period: "2022 — PRESENT",
    institution: "National College of Engineering",
    program: "Bachelor of Computer Engineering",
    location: "Satdobato, Lalitpur",
  },
  {
    period: "2020 — 2022",
    institution: "Khwopa Secondary School",
    program: "Higher Secondary Education (+2 Science)",
    location: "Bhaktapur",
  },
];

// ------------------------------------------------------------
// CURRENT LEARNING
// ------------------------------------------------------------
export type LearningStage = "EXPLORING" | "LEARNING" | "BUILDING";

export const currentLearning: { name: string; stage: LearningStage }[] = [
  { name: "AI / MACHINE LEARNING", stage: "EXPLORING" },
  { name: "FULL-STACK DEVELOPMENT", stage: "BUILDING" },
  { name: "CLOUD TECHNOLOGIES", stage: "LEARNING" },
  { name: "ADVANCED SOFTWARE TESTING", stage: "BUILDING" },
  { name: "SYSTEM DESIGN", stage: "LEARNING" },
  { name: "MOBILE DEVELOPMENT", stage: "BUILDING" },
];

// ------------------------------------------------------------
// PROFESSIONAL PROFILE
// ------------------------------------------------------------
export const contributions = [
  { title: "SOFTWARE DEVELOPMENT", description: "Build responsive and functional applications." },
  { title: "QUALITY ASSURANCE", description: "Design tests and identify software issues." },
  { title: "API TESTING", description: "Validate backend services and API behavior." },
  { title: "DATABASE", description: "Work with SQL and NoSQL databases." },
  { title: "DATA OPERATIONS", description: "Accurate data entry, organization and validation." },
  { title: "UI/UX", description: "Create practical and responsive interfaces." },
  { title: "PHOTOGRAPHY", description: "Capture professional and creative visual content." },
  { title: "VIDEOGRAPHY", description: "Create visual stories through motion." },
];

// ------------------------------------------------------------
// PHILOSOPHY
// ------------------------------------------------------------
export const philosophyWords = ["BUILD IT.", "BREAK IT.", "TEST IT.", "IMPROVE IT.", "CAPTURE IT."];

export const philosophyStatement =
  "Whether I am developing software, testing an application, organizing data, designing an interface, or capturing a moment, I focus on detail, usability and continuous improvement.";

// ------------------------------------------------------------
// SOCIAL
// ------------------------------------------------------------
export const socialCards = [
  {
    key: "github",
    label: "GITHUB",
    tagline: "Code I build.",
    handle: "@KrishalDai17",
    url: profile.links.github,
    cta: "VIEW GITHUB",
  },
  {
    key: "instagram",
    label: "INSTAGRAM",
    tagline: "Frames I capture.",
    handle: "@only__krishal",
    url: profile.links.instagram,
    cta: "VIEW INSTAGRAM",
  },
  {
    key: "facebook",
    label: "FACEBOOK",
    tagline: "Updates and moments.",
    handle: "",
    url: profile.links.facebook,
    cta: "VIEW FACEBOOK",
  },
  {
    key: "linkedin",
    label: "LINKEDIN",
    tagline: "Professional journey.",
    handle: "",
    url: profile.links.linkedin || "[ADD LINKEDIN URL]",
    cta: "VIEW LINKEDIN",
  },
];
