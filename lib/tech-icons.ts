import type { ComponentType } from "react";
import {
  SiDocker,
  SiExpress,
  SiFlask,
  SiGit,
  SiGithub,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPhp,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { BrainCircuit, Code, Boxes, Radio, Sparkles } from "lucide-react";

export type TechIcon = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

/**
 * Maps every technology name used across the site to its brand icon.
 * Concepts without an official brand mark (AI, Machine Learning, ...)
 * use a neutral lucide glyph so every item keeps an icon.
 */
export const techIcons: Record<string, TechIcon> = {
  // Frontend
  React: SiReact,
  "Next.js": SiNextdotjs,
  Vue: SiVuedotjs,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
  // Backend
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  PHP: SiPhp,
  Flask: SiFlask,
  // Data
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  // AI / CV
  Python: SiPython,
  AI: Sparkles,
  "Machine Learning": BrainCircuit,
  OpenCV: SiOpencv,
  "Groq API": Sparkles,
  MediaPipe: BrainCircuit,
  // Tools
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Zustand: Boxes,
  // Project-scope concepts
  "Web Development": Code,
  "Real-time Systems": Radio,
};

export function getTechIcon(name: string): TechIcon | undefined {
  return techIcons[name];
}
