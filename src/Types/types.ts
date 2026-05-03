import { ReactNode } from "react";

export interface AnimationLottieProps {
  animationPath: object; // JSON object for the animation data.
  width?: string | number; // Optional width prop for customization.
}
export interface GlowCardProps {
  children: ReactNode;
  identifier: string;
}
export interface Project {
  id: string | number;
  name: string;
  description: string;
  shortTitle?: string;
  fullName?: string;
  tools?: string[];
  features?: string[];
  highlights?: string[];
  code?: string;
  github?: string;
  demo?: string;
  live?: string;
  videos?: string[];
  docs?: string;
  images?: string[];
  thumbnail?: string;
  featured?: boolean;
  isMain?: boolean;
  priority?: number;
  role?: string;
  category?: string;
  type?: string;
  status?: string;
  date?: string;
  year?: string;
  pipeline?: string[];
  system_architecture?: {
    type: string;
    components: string[];
    flow: string;
  };
  api_schema?: Record<string, string[]>;
  analytics?: {
    description: string;
    features: string[];
  };
  deployment?: {
    platforms: string[];
    highlights: string[];
  };
  capabilities?: string[];
  core_systems?: {
    upload_pipeline: string;
    cache_hierarchy: string;
    search: string;
  };
  security?: string[];
  performance?: string[];
}
export interface ProjectCardProps {
  project: Project;
}
export interface Props {
  children: ReactNode;
}
