import { ReactNode } from "react";

export interface AnimationLottieProps {
  animationPath: object; // JSON object for the animation data.
  width?: string | number; // Optional width prop for customization.
}
export interface GlowCardProps {
  children: ReactNode;
  identifier: string;
}
interface Project {
  id: number;
  name: string;
  fullName?: string;
  shortTitle?: string;
  tools: string[];
  role: string;
  description: string;
  code?: string;
  demo?: string;
  date: string;
  type?: string;
  images?: string[];
  thumbnail?: string;
  videos?: string[];
  highlights?: string[];
  features?: string[];
  pipeline?: string[];
  featured?: boolean;
  isMain?: boolean;
  priority?: number;
  status?: string;
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
