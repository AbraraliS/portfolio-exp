import { Project, ProjectLine, ProjectOrigin } from "@/Types/types";
import { projectsData } from "./Data/projects-data";

export const lineLabels: Record<ProjectLine, string> = {
  ai: "AI systems",
  agents: "Agents and workflows",
  systems: "Distributed systems",
  web: "Full stack products",
};

export const originLabels: Record<ProjectOrigin, string> = {
  personal: "Personal project",
  client: "Client project",
  prototype: "Hackathon prototype",
};

/** A project belongs to its primary line and to any other its category names. */
export const projectLines = (project: Project): ProjectLine[] => {
  const text = `${project.category ?? ""} ${project.type ?? ""}`;
  const lines = new Set<ProjectLine>([project.line]);
  if (/\bAI\b/.test(text)) lines.add("ai");
  if (/Automation|Workflow|Agent/i.test(text)) lines.add("agents");
  if (/Distributed|System Design|Systems\b/i.test(text)) lines.add("systems");
  if (/Full Stack/i.test(text)) lines.add("web");
  return [...lines];
};

export const projectsInOrder = (): Project[] =>
  [...projectsData].sort((a, b) => {
    const byPriority = (a.priority ?? 999) - (b.priority ?? 999);
    if (byPriority !== 0) return byPriority;
    // Ties: projects with something to look at go first.
    return Number(!!b.thumbnail) - Number(!!a.thumbnail);
  });

export const projectName = (project: Project) =>
  project.shortTitle ?? project.name;

/** "TIPS — Temporal Interview Profiling System" gives the part after the dash. */
export const projectSubtitle = (project: Project) => {
  const parts = (project.fullName ?? project.name).split(" — ");
  return parts.length > 1 ? parts.slice(1).join(" — ") : undefined;
};

export const projectLiveUrl = (project: Project) =>
  project.live ?? project.demo;

export const projectSourceUrl = (project: Project) =>
  project.github ?? project.code;

export const projectYear = (project: Project) => project.date ?? project.year;

export const flowStops = (flow?: string) =>
  flow
    ? flow
        .split("→")
        .map((stop) => stop.trim())
        .filter(Boolean)
    : [];

/** "/projects/tips/tips-qa.png" gives "Q&A"; "buysmart-search.png" gives "Search". */
export const imageCaption = (src: string) => {
  const file = (src.split("/").pop() ?? "").replace(/\.[a-z0-9]+$/i, "");
  const words = file
    .replace(/^\d+-?/, "")
    .split(/[-_]/)
    .slice(1)
    .filter((word) => !/^v\d+$/i.test(word));
  const label = words.join(" ");
  if (!label) return "Screen";
  if (label.toLowerCase() === "qa") return "Q&A";
  return label[0].toUpperCase() + label.slice(1);
};

export const youTubeId = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|\/embed\/|\/v\/|[?&]v=)([A-Za-z0-9_-]{11})/,
  );
  return match ? match[1] : null;
};
