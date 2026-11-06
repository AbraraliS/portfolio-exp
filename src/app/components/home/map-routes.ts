import { ProjectLine } from "@/Types/types";

/*
 * Every route is a real pipeline from the project's own stages. Coordinates
 * live in a 1000 x 700 space.
 */
export interface Station {
  x: number;
  y: number;
  label: string;
  /** Which side of the station the label sits on. */
  side: "top" | "bottom" | "left" | "right";
}

export interface Route {
  id: string;
  name: string;
  summary: string;
  href: string;
  line: ProjectLine;
  d: string;
  stations: Station[];
}

export const routes: Route[] = [
  {
    id: "tips",
    name: "TIPS",
    summary: "Scores recorded interviews from audio, video and language.",
    href: "/projects/1",
    line: "ai",
    d: "M40 90H360L520 250H760L900 390V500",
    stations: [
      { x: 40, y: 90, label: "Timebase", side: "top" },
      { x: 200, y: 90, label: "Extraction", side: "bottom" },
      { x: 360, y: 90, label: "Segmentation", side: "top" },
      { x: 640, y: 250, label: "Behaviour", side: "bottom" },
      { x: 760, y: 250, label: "Semantic scoring", side: "top" },
      { x: 900, y: 500, label: "Aggregation", side: "right" },
    ],
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    summary: "A commander agent delegating work to specialist sub-agents.",
    href: "/projects/2",
    line: "agents",
    d: "M40 610H270L380 500H900",
    stations: [
      { x: 40, y: 610, label: "Input", side: "bottom" },
      { x: 200, y: 610, label: "Decomposition", side: "bottom" },
      { x: 440, y: 500, label: "Delegation", side: "top" },
      { x: 680, y: 500, label: "Parallel execution", side: "bottom" },
      { x: 900, y: 500, label: "Aggregation", side: "right" },
    ],
  },
  {
    id: "gitstore",
    name: "GitStore",
    summary: "Private GitHub repositories turned into a personal file system.",
    href: "/projects/3",
    line: "systems",
    d: "M960 90H680L540 230V660",
    stations: [
      { x: 960, y: 90, label: "Hashing", side: "right" },
      { x: 800, y: 90, label: "Deduplication", side: "top" },
      { x: 620, y: 150, label: "Chunking", side: "right" },
      { x: 540, y: 360, label: "Parallel upload", side: "left" },
      { x: 540, y: 660, label: "Index update", side: "right" },
    ],
  },
  {
    id: "texora",
    name: "Texora",
    summary: "A B2B textile marketplace with AI-assisted sourcing.",
    href: "/projects/texora-marketplace",
    line: "web",
    d: "M40 340H240L300 400H780L860 320H960",
    stations: [
      { x: 40, y: 340, label: "User", side: "top" },
      { x: 200, y: 340, label: "Next.js app", side: "top" },
      { x: 680, y: 400, label: "Auth, DB, AI services", side: "bottom" },
      { x: 960, y: 320, label: "Rendered UI", side: "top" },
    ],
  },
];
