import type { Metadata } from "next";
import Link from "next/link";
import {
  originLabels,
  projectName,
  projectsInOrder,
} from "@/../utils/project-helpers";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import JsonLd from "../components/site/JsonLd";

const description =
  "Every project by AbrarAli S.: Criza Labs products, client work, AI systems and full stack builds, with stack and links.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  ...shareMeta({
    title: "Projects | AbrarAli S.",
    description,
    path: "/projects",
  }),
};

const yearOf = (p: { date?: string; year?: string }) =>
  (p.date ?? p.year ?? "").slice(0, 4);

export default function ProjectsPage() {
  const projects = projectsInOrder()
    .map((p, order) => ({ p, order }))
    .sort((a, b) => yearOf(b.p).localeCompare(yearOf(a.p)) || a.order - b.order)
    .map(({ p }) => p);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <div className="arch">
        <Link href="/" className="arch-back">
          ← AbrarAli S.
        </Link>
        <h1>All projects</h1>
        <p className="arch-lead">
          {projects.length} projects, newest first: the products I build at
          Criza Labs, client work and the systems I built to learn. Open any one
          for the full case study.
        </p>
        <table className="arch-table">
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Project</th>
              <th scope="col" className="arch-hide-sm">
                Made as
              </th>
              <th scope="col" className="arch-hide-sm">
                Built with
              </th>
              <th scope="col" className="arch-hide-sm">
                Links
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="arch-year">{yearOf(p) || "—"}</td>
                <td className="arch-name">
                  <Link href={`/projects/${p.id}`}>{projectName(p)}</Link>
                  <small>{p.category}</small>
                </td>
                <td className="arch-hide-sm">{originLabels[p.origin]}</td>
                <td className="arch-hide-sm">
                  <span className="arch-tags">
                    {(p.tools ?? []).slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                </td>
                <td className="arch-hide-sm arch-links">
                  {p.live && (
                    <a
                      className="arch-link"
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live
                    </a>
                  )}
                  {(p.github || p.code) && (
                    <a
                      className="arch-link"
                      href={p.github ?? p.code}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
