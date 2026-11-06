/** Where a project came from. Shown on every card and filterable. */
export type ProjectOrigin = "company" | "personal" | "client" | "prototype";

/** Discipline colour on the system map. */
export type ProjectLine = "ai" | "agents" | "systems" | "web";

/** One unit of article content. Text fields accept `code`, **bold** and [links](/url). */
export type PostBlock =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "note"; text: string }
  | { t: "quote"; text: string; cite: string }
  | { t: "list"; items: string[]; ordered?: boolean }
  | { t: "code"; lang: string; code: string; file?: string }
  | { t: "route"; stops: string[]; label: string }
  | { t: "table"; head: string[]; rows: string[][] };

export interface Post {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  line: ProjectLine;
  /** The stages drawn as this article's cover route. */
  stops: string[];
  /** Ids of projects the article discusses. */
  projects: string[];
  skills: string[];
  blocks: PostBlock[];
}

export interface Project {
  id: string | number;
  name: string;
  description: string;
  origin: ProjectOrigin;
  originNote?: string;
  line: ProjectLine;
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

export interface Achievement {
  title?: string;
  name?: string; // For backward compatibility
  type?: string;
  description?: string;
  focus?: string;
  id?: string;
  link?: string;
  year?: string;
}
