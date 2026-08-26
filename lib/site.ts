/* ---------------------------------------------------------------------------
 * Site config — Arsene Mucyuneje's portfolio content.
 * All page copy lives here so components stay reusable and content stays
 * editable in one place.
 * ------------------------------------------------------------------------- */

import type { LucideIcon } from "lucide-react";
import { Code2, Handshake, Layers, MapPin } from "lucide-react";

export const siteConfig = {
  /** Canonical brand/entity name — used in titles, OG tags, footer and
   *  JSON-LD so every surface agrees on one identity (helps Sitelinks). */
  name: "Mucyuneje Hirwa Arsene",
  role: "Software Engineer & IT Consultant",
  location: "Rwanda",
  /** Canonical site URL — used by metadata, sitemap and robots. */
  url: "https://mucyuneje.space",
  /** Default <title> for the homepage (page.tsx pins it absolutely). */
  title: "Mucyuneje Hirwa Arsene | Software Developer",
  description:
    "Software developer & IT consultant building full-stack web applications, APIs and AI systems that solve real problems for organizations.",
  githubUrl: "https://github.com/mucyuneje",
  /** Hero pill + contact section — REPLACE with your real profiles */
  linkedinUrl: "https://www.linkedin.com/in/mucyuneje",
  email: "hello@mucyuneje.space",
  /** WhatsApp + Instagram — secondary channels, shown in the contact
   *  section only (the hero keeps GitHub / Instagram / Email) */
  whatsappUrl: "https://wa.me/250784222615",
  instagramUrl: "https://instagram.com/mucyuneje",
};

/** Targeted industry terms — emitted as meta keywords and reused as
 *  `knowsAbout` in the Person JSON-LD entity. */
export const seoKeywords = [
  "software developer",
  "full-stack developer",
  "software engineering",
  "web application development",
  "API development",
  "digital solutions",
  "IT consultant",
  "React developer",
  "Next.js developer",
  "Node.js backend",
  "AI systems",
  "machine learning",
  "database design",
  "freelance developer",
  "Rwanda software developer",
  "Kigali tech",
];

/** Profile photo — drop your picture in /public/images and update the path. */
export const profile = {
  avatar: "/images/profile.jpg",
  avatarAlt: "Portrait of Arsene Mucyuneje Hirwa",
};

export type NavItem = {
  label: string;
  href: string;
  /** Manually set the active item for now; wire up scroll-spy later. */
  active?: boolean;
};

/** Shared by desktop sidebar + mobile drawer. Each item maps to a real
 *  route — Google needs distinct URLs to generate Sitelinks. */
export const navItems: NavItem[] = [
  { label: "Intro", href: "/", active: true },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

export const heroContent = {
  /** Wordmark shown top-left in the fixed header (below lg) and in the
   *  mobile drawer — the sidebar carries it on large screens */
  identity: "Mucyuneje Hirwa Arsene",
  /** Role + base line, rendered as the accent kicker */
  role: "Software Developer & IT Consultant based in Rwanda",
  headline:
    "I build digital products, web applications & AI systems that solve real problems.",
  /** Shorter variant shown below the md breakpoint */
  headlineShort: "I build web applications, digital products & AI systems.",
};

export type Project = {
  title: string;
  /** Concise card summary — kept to ~2 sentences; clamped to 3 lines in UI */
  description: string;
  /** Wide preview image — swap in real screenshots when available */
  image: string;
  /** Tech names — resolved to icons via lib/tech-icons.ts */
  tech: string[];
  /** Live deployment — rendered as the card's primary "Live Demo" link */
  demoUrl?: string;
  /** Public repository — rendered as a secondary "Source Code" link */
  sourceUrl?: string;
  /** Extra screenshots/GIFs — drop files in /public/images, list paths here.
   *  Rendered as a thumbnail strip under the preview by ProjectGallery. */
  gallery?: string[];
};

/** The Selected Work section renders the first three as a curated preview. */
export const projects: Project[] = [
  {
    title: "Echelon: AI-Powered Talent Screening",
    description:
      "Production-ready recruiter platform using Google Gemini AI to screen, score, and shortlist job applicants from structured talent profiles and uploaded resumes. Built for the Umurava AI Hackathon.",
    image: "/images/project-echelon.svg",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "AI", "Tailwind CSS"],
    demoUrl: "https://echelon-theta.vercel.app/",
  },
  {
    title: "Mubiligi TSS: School Portal",
    description:
      "Full-stack web app for a Catholic Technical Secondary School — public website, online student application portal with MTN MoMo / Airtel Money payments, CMS, and a comprehensive admin dashboard.",
    image: "/images/project-mubiligi.svg",
    tech: ["React", "Express", "MongoDB", "Redis", "Docker", "Tailwind CSS"],
  },
  {
    title: "UBWAMI TechHouse: Enterprise SaaS",
    description:
      "Enterprise web application for a tech company — public marketing site with blog, admin dashboard with Kanban project management, lead pipeline, support tickets, and real-time notifications via SSE.",
    image: "/images/project-ubwami.svg",
    tech: ["React", "Express", "MongoDB", "Zustand", "SSE", "Tailwind CSS"],
  },
  {
    title: "RebaBus: Real-Time Bus Tracking",
    description:
      "Map-first real-time bus tracking system for Kigali — fullscreen interactive map with live bus markers, ETA predictions, route filtering, and mobile-friendly sliding panels.",
    image: "/images/project-rebabus.svg",
    tech: ["React", "Leaflet", "Real-time Systems", "Tailwind CSS"],
  },
  {
    title: "NEXORA: Gesture Control System",
    description:
      "Computer vision system using hand gestures and face tracking to control the mouse cursor, scroll, zoom, and click entirely through the webcam, with a Flask web streaming interface.",
    image: "/images/project-nexora.svg",
    tech: ["Python", "OpenCV", "MediaPipe", "Flask"],
  },
  {
    title: "Interview Hider: AI Interview Assistant",
    description:
      "Desktop app that captures system audio during interviews, transcribes it in real-time with local Whisper, and generates AI answers via Groq API. The window is invisible to screenshots and screen recordings.",
    image: "/images/project-interview.svg",
    tech: ["Python", "AI", "Groq API"],
  },
  {
    title: "mucyuneje.space: Portfolio Website",
    description:
      "Modern personal portfolio built with Next.js — server-side rendered, animated, responsive, with project showcase and optimized performance.",
    image: "/images/project-portfolio.svg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://mucyuneje.space",
  },
  {
    title: "Mukedealz: E-Commerce Platform",
    description:
      "Full-stack e-commerce web application with product listings, shopping cart, and a modern UI with TypeScript type safety.",
    image: "/images/project-mukedealz.svg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Umurenge IT Inventory System",
    description:
      "Centralized web app for managing IT equipment, stock levels, and asset distribution across departments — improving efficiency, transparency and accountability.",
    image: "/images/project-inventory.svg",
    tech: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Alaniiautos: Auto Dealership Platform",
    description:
      "Next.js web application for an automobile dealership featuring vehicle listings and a modern responsive interface.",
    image: "/images/project-alanii.svg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export const aboutContent = {
  intro:
    "I'm Arsene, a software developer from Rwanda who builds web applications, business systems and AI-powered solutions. I work across frontend, backend and databases, turning real-world problems into practical software.",
  facts: [
    { icon: MapPin, label: "Based in", value: "Rwanda" },
    { icon: Layers, label: "Focus", value: "Software · Web · AI" },
    { icon: Code2, label: "Role", value: "Developer · Consultant" },
    {
      icon: Handshake,
      label: "Available for",
      value: "Projects · Freelance · Collaboration",
    },
  ] satisfies { icon: LucideIcon; label: string; value: string }[],
};

export const tools = [
  { category: "Frontend", items: ["React", "Next.js", "Vue", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "PHP"] },
  { category: "Database", items: ["MySQL", "MongoDB"] },
  { category: "AI", items: ["Python", "Machine Learning"] },
  { category: "Tools", items: ["Git", "GitHub", "Docker"] },
];

/** The four technologies highlighted in the hero strip (mobile). Single
 *  curated subset — edit here, not in the page markup. The full marquee
 *  and the Tools section both derive from `tools` above. */
export const highlightedTech = ["React", "Next.js", "Node.js", "Python"];

export type ExperienceEntry = {
  org: string;
  role: string;
  description: string;
  /** Period label, e.g. "2024 — Present" (optional) */
  date?: string;
  /** Small pill badges above the title */
  tags?: string[];
  /** Key achievements rendered as a bulleted list */
  responsibilities?: string[];
  /** Company logo path under /public (initials fallback when omitted) */
  logo?: string;
};

/** Main professional timeline — roles with dates and concrete achievements.
 *  Lighter leadership/program entries live in `leadershipPrograms` so the
 *  visual weight of each entry matches its actual content depth. */
export const experience: ExperienceEntry[] = [
  {
    org: "UBWAMI TechHouse",
    role: "Founder & Lead Developer",
    date: "2024 — Present",
    tags: ["Founder", "Full-Stack"],
    logo: "/images/ubwamitechhouse.png",
    description:
      "Leading software engineering initiatives, architecture and deployment for digital products and full-stack client solutions.",
    responsibilities: [
      "Designed and deployed scalable web applications using React, Next.js and Node.js.",
      "Integrated Gemini AI APIs for automated talent screening and résumé processing.",
      "Engineered real-time tracking backends with WebSockets and Node.js.",
    ],
  },
  {
    org: "City of Kigali",
    role: "IT & Systems Intern",
    date: "2024",
    tags: ["Internship", "IT Support"],
    logo: "/images/cityofkigali.jpg",
    description:
      "Managed technical infrastructure and provided hands-on system troubleshooting in a professional environment.",
    responsibilities: [
      "Maintained internal network systems, hardware infrastructure and software deployments.",
      "Assisted administrative teams with IT workflow optimizations and system diagnostics.",
    ],
  },
];

/** Leadership & programs — rendered as a compact sub-list under the main
 *  timeline (no dates/bullets yet; promote entries by moving them up and
 *  adding `date` + `responsibilities`). */
export const leadershipPrograms: ExperienceEntry[] = [
  {
    org: "School Leadership",
    role: "Leadership & Coordination",
    tags: ["Leadership"],
    logo: "/images/msgrmubiligileadership.jpeg",
    description:
      "Experience in student leadership, coordination and responsibility.",
  },
  {
    org: "iLead Rwanda",
    role: "Leadership Development",
    tags: ["Program"],
    logo: "/images/ileadprogram.jpg",
    description: "Leadership development and personal growth program.",
  },
];

export const githubSection = {
  heading: "I build, experiment & learn in public.",
  description: "Explore my projects, experiments and open-source work on GitHub.",
  cta: "View GitHub ↗",
};

export const finalCta = {
  headingLines: ["Have an idea?", "Let's build it."],
  description:
    "Have a project, business problem, or idea that could become software?",
  cta: "Get in touch ↗",
  // Direct line — the mailto: link uses the real address from siteConfig.
  href: `mailto:${siteConfig.email}`,
};

export const socials = [
  { label: "GitHub", href: siteConfig.githubUrl },
  { label: "Instagram", href: "https://instagram.com/mucyuneje" },
  { label: "Email", href: `mailto:${siteConfig.email}` },
].filter((social) => social.href !== "#");
