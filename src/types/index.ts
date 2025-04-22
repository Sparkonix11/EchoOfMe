// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnailUrl: string;
  videoUrl?: string;
  liveUrl?: string;
  sourceUrl?: string;
  screenshots?: string[];
}

// Skills organized by category
export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  proficiency?: number; // 0-100
}

// Experience types
export interface Experience {
  title: string;
  company?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  achievements?: string[];
}

// Education types
export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  achievements?: string[];
}

// Theme context types
export type ThemeMode = 'light' | 'dark' | 'system';

// Video player types
export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}