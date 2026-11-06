"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/Types/types";
import {
  flowStops,
  lineLabels,
  originLabels,
  projectLiveUrl,
  projectName,
  projectSourceUrl,
  projectSubtitle,
  projectYear,
} from "@/../utils/project-helpers";
import { lineStyle } from "@/../utils/site";
import RouteDiagram from "./RouteDiagram";

const TOOL_LIMIT = 5;

export default function ProjectCard({
  project,
  wide = false,
}: {
  project: Project;
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const name = projectName(project);
  const subtitle = projectSubtitle(project);
  const stops = flowStops(project.system_architecture?.flow);
  const tools = project.tools ?? [];
  const live = projectLiveUrl(project);
  const source = projectSourceUrl(project);
  const detailsId = `project-details-${String(project.id).replace(/\W/g, "")}`;

  return (
    <article
      className={`card ${wide ? "card-wide" : ""}`}
      style={{
        ...lineStyle(project.line),
        viewTransitionName: `project-${String(project.id).replace(/\W/g, "")}`,
      }}
    >
      {project.thumbnail ? (
        <div className="card-media">
          <Image
            src={project.thumbnail}
            alt={`${name} screenshot`}
            fill
            sizes={
              wide
                ? "(min-width: 1024px) 60vw, 86vw"
                : "(min-width: 768px) 45vw, 86vw"
            }
          />
        </div>
      ) : (
        stops.length > 0 && (
          <div className="card-media card-media-route">
            <RouteDiagram stops={stops} label={`${name} flow`} />
          </div>
        )
      )}

      <div className="card-body">
        <p className="card-line">{lineLabels[project.line]}</p>
        <h3 className="card-title">
          <Link href={`/projects/${project.id}`} className="card-link">
            {name}
          </Link>
        </h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        <p className="card-text">{project.description}</p>

        <button
          type="button"
          className="card-more"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((value) => !value)}
        >
          Role and stack
          <ChevronDown aria-hidden="true" />
        </button>

        <div id={detailsId} className={`card-details ${open ? "is-open" : ""}`}>
          <div className="card-details-inner">
            <dl className="card-facts">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Origin</dt>
                <dd>
                  {originLabels[project.origin]}
                  {projectYear(project) ? `, ${projectYear(project)}` : ""}
                </dd>
              </div>
            </dl>

            <ul className="card-tools" aria-label="Technologies">
              {tools.slice(0, TOOL_LIMIT).map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
              {tools.length > TOOL_LIMIT && (
                <li className="card-tools-more">
                  +{tools.length - TOOL_LIMIT} more
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="card-actions">
          <span className="card-open" aria-hidden="true">
            Read the case study
          </span>
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer">
              Live demo <ExternalLink aria-hidden="true" />
            </a>
          )}
          {source && (
            <a href={source} target="_blank" rel="noopener noreferrer">
              Source <ExternalLink aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
