"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ProjectLine, ProjectOrigin } from "@/Types/types";
import {
  lineLabels,
  originLabels,
  projectLines,
  projectsInOrder,
} from "@/../utils/project-helpers";
import { lineStyle } from "@/../utils/site";
import ProjectCard from "./ProjectCard";

const projects = projectsInOrder();
const lineOrder: ProjectLine[] = ["ai", "agents", "systems", "web"];
const originOrder: ProjectOrigin[] = ["personal", "client", "prototype"];

/* Origins with no projects stay out of the filter. */
const origins = originOrder.filter((origin) =>
  projects.some((project) => project.origin === origin),
);

const originPlural: Record<ProjectOrigin, string> = {
  personal: "Personal",
  client: "Client",
  prototype: "Prototypes",
};

/** Morphs cards between filter states where the browser supports it. */
const withTransition = (update: () => void) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("startViewTransition" in document)) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
};

export default function ProjectExplorer({
  initialLimit,
  rail = false,
}: {
  initialLimit?: number;
  /** Phones: swipe through the projects sideways instead of a long column. */
  rail?: boolean;
}) {
  const [line, setLine] = useState<ProjectLine | null>(null);
  const [origin, setOrigin] = useState<ProjectOrigin | null>(null);
  const [expanded, setExpanded] = useState(!initialLimit);
  const [position, setPosition] = useState(0);
  const grid = useRef<HTMLDivElement>(null);

  const matches = projects.filter(
    (project) =>
      (!line || projectLines(project).includes(line)) &&
      (!origin || project.origin === origin),
  );
  const filtering = !!line || !!origin;
  const visible =
    expanded || filtering ? matches : matches.slice(0, initialLimit);

  // The stations under the rail follow whichever card is centred.
  useEffect(() => {
    const el = grid.current;
    if (!el || !rail) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = [...el.children] as HTMLElement[];
      const middle = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDistance = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.offsetLeft - el.offsetLeft + card.offsetWidth / 2 - middle,
        );
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setPosition(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [rail, visible.length]);

  const goTo = (index: number) => {
    const el = grid.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollTo({
      left:
        card.offsetLeft -
        el.offsetLeft -
        (el.clientWidth - card.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="explorer">
      <div className="filters">
        <div
          className="filter-group"
          role="group"
          aria-label="Filter by discipline"
        >
          <button
            type="button"
            className="chip"
            aria-pressed={!line}
            onClick={() => withTransition(() => setLine(null))}
          >
            All disciplines
          </button>
          {lineOrder.map((value) => (
            <button
              key={value}
              type="button"
              className="chip chip-line"
              style={lineStyle(value)}
              aria-pressed={line === value}
              onClick={() =>
                withTransition(() => setLine(line === value ? null : value))
              }
            >
              {lineLabels[value]}
            </button>
          ))}
        </div>
        <div
          className="filter-group"
          role="group"
          aria-label="Filter by origin"
        >
          <button
            type="button"
            className="chip"
            aria-pressed={!origin}
            onClick={() => withTransition(() => setOrigin(null))}
          >
            All origins
          </button>
          {origins.map((value) => (
            <button
              key={value}
              type="button"
              className="chip"
              title={originLabels[value]}
              aria-pressed={origin === value}
              onClick={() =>
                withTransition(() => setOrigin(origin === value ? null : value))
              }
            >
              {originPlural[value]}
            </button>
          ))}
        </div>
      </div>

      <p className="filter-count" role="status">
        Showing {visible.length} of{" "}
        {filtering ? matches.length : projects.length}{" "}
        {matches.length === 1 && filtering ? "project" : "projects"}
      </p>

      {visible.length > 0 ? (
        <>
          <div
            ref={grid}
            className={`work-grid ${rail ? "work-grid-rail" : ""}`}
            tabIndex={rail ? 0 : undefined}
            role={rail ? "group" : undefined}
            aria-label={
              rail ? "Projects, scroll sideways on a phone" : undefined
            }
          >
            {visible.map((project, index) => {
              const isLead = index === 0;
              const isOrphan =
                !isLead &&
                index === visible.length - 1 &&
                visible.length % 2 === 0;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  wide={isLead || isOrphan}
                />
              );
            })}
          </div>
          {rail && visible.length > 1 && (
            <div className="rail-stations">
              {visible.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  aria-label={`Show project ${index + 1} of ${visible.length}`}
                  aria-current={index === position ? "true" : undefined}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="filter-empty">
          <p>No project matches both filters.</p>
          <button
            type="button"
            className="btn btn-ink"
            onClick={() =>
              withTransition(() => {
                setLine(null);
                setOrigin(null);
              })
            }
          >
            <span>Clear filters</span>
          </button>
        </div>
      )}

      {!expanded && !filtering && visible.length < projects.length && (
        <button
          type="button"
          className="btn btn-ink explorer-more"
          onClick={() => withTransition(() => setExpanded(true))}
        >
          <span>Show all {projects.length} projects</span>
        </button>
      )}
    </div>
  );
}
