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
  shortTitle?: string;
  tools: string[];
  role: string;
  description: string;
  code: string;
  demo: string;
  date: string;
  type?: string;
  images: string[];
  videos?: string[];
  highlights?: string[];
  features?: string[];
  pipeline?: string[];
  system_architecture?: {
    type: string;
    components: string[];
    flow: string;
  };
  api_schema?: Record<string, string[]>;
}
export interface ProjectCardProps {
  project: Project;
}
export interface Props {
  children: ReactNode;
}
