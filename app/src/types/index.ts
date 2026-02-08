// Global type definitions

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: React.ComponentType;
  category: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  tech: string[];
  color: 'cyan' | 'purple' | 'magenta';
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  icon: React.ComponentType;
  href: string;
  label: string;
}

// Three.js related types
export interface ThreeSceneProps {
  className?: string;
}

export interface ParticleData {
  positions: Float32Array;
  colors: Float32Array;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}

export interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';
  delay?: number;
  className?: string;
}

// Component prop types
export interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'magenta';
  intensity?: number;
}

export interface SkillCard3DProps {
  name: string;
  icon: React.ReactNode;
  color?: 'cyan' | 'purple' | 'magenta';
}

export interface ProjectCard3DProps {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}
