import type { Metadata } from "next";
import { projectsData } from "@/../utils/Data/projects-data";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import ProjectExplorer from "../components/projects/ProjectExplorer";
import JsonLd from "../components/site/JsonLd";

const description =
  "AI systems, distributed storage, agent orchestration and full stack products built by Abrarali Sunasara.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  ...shareMeta({
    title: "Projects | Abrarali Sunasara",
    description,
    path: "/projects",
  }),
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <header className="page-head">
        <div className="page-head-inner">
          <h1>All projects</h1>
          <p>
            {projectsData.length} projects, each with its role, origin, stack
            and verified links. Filter by discipline or by where the work came
            from.
          </p>
        </div>
      </header>
      <div className="plain-shell">
        <h2 className="sr-only">Project list</h2>
        <ProjectExplorer />
      </div>
    </>
  );
}
