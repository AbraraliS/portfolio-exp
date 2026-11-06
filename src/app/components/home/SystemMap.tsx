"use client";

import { Play } from "lucide-react";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ProjectLine } from "@/Types/types";
import type { HeroGL } from "./hero-gl";
import { routes } from "./map-routes";
import { createStore, runPipeline } from "./pipeline-demo";

const CYCLE_MS = 5200;
const STAGE_TRAVEL_MS = 520;
const GITSTORE = routes.findIndex((route) => route.id === "gitstore");
const lineColor = (line: ProjectLine) => `var(--line-${line}-bright)`;

/** Waits a frame's worth of idle time before starting decorative work. */
const whenIdle = (callback: () => void) => {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 1200);
  return () => clearTimeout(id);
};

export default function SystemMap() {
  const [activeId, setActiveId] = useState(routes[0].id);
  const [motionOk, setMotionOk] = useState(false);
  const [cycling, setCycling] = useState(true);
  const [text, setText] = useState("hello whole line");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [outcome, setOutcome] = useState("");

  const active = routes.find((route) => route.id === activeId) ?? routes[0];
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const paths = useRef<Record<string, SVGPathElement | null>>({});
  const firstRun = useRef(true);
  const glRef = useRef<HeroGL | null>(null);
  const store = useRef(createStore());
  const runningRef = useRef(false);
  const dotAt = useRef(0);

  const choose = useCallback((id: string) => {
    if (runningRef.current) return;
    setCycling(false);
    setActiveId(id);
    setResults({});
    setOutcome("");
  }, []);

  useEffect(() => {
    setMotionOk(
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches,
    );
  }, []);

  // The living layer loads last, so it can never delay the page.
  useEffect(() => {
    if (!motionOk) return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return;

    let cancelled = false;
    const cancelIdle = whenIdle(() => {
      import("./hero-gl").then(({ startHeroGL }) => {
        const host = document.querySelector<HTMLElement>(".hero");
        const canvas =
          document.querySelector<HTMLCanvasElement>(".hero-canvas");
        if (cancelled || !host || !canvas || !svg.current) return;
        const style = getComputedStyle(document.documentElement);
        glRef.current = startHeroGL(
          canvas,
          host,
          svg.current,
          routes.map((route) => route.d),
          routes.map((route) =>
            style.getPropertyValue(`--line-${route.line}-bright`),
          ),
        );
        glRef.current?.setActive(
          routes.findIndex((route) => route.id === activeId),
        );
      });
    });
    return () => {
      cancelled = true;
      cancelIdle();
      glRef.current?.destroy();
      glRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionOk]);

  useEffect(() => {
    glRef.current?.setActive(
      routes.findIndex((route) => route.id === activeId),
    );
  }, [activeId]);

  // A short tour of the lines, only while the map is on screen.
  useEffect(() => {
    if (!motionOk || !cycling || !root.current) return;
    let timer = 0;
    const stop = () => window.clearInterval(timer);
    const observer = new IntersectionObserver(([entry]) => {
      stop();
      if (entry.isIntersecting && !document.hidden) {
        timer = window.setInterval(() => {
          setActiveId((current) => {
            const index = routes.findIndex((route) => route.id === current);
            return routes[(index + 1) % routes.length].id;
          });
        }, CYCLE_MS);
      }
    });
    observer.observe(root.current);
    return () => {
      stop();
      observer.disconnect();
    };
  }, [motionOk, cycling]);

  // The bright train runs the selected line, so each change is visible.
  useEffect(() => {
    const circle = dot.current;
    const path = paths.current[activeId];
    if (!circle || !path || !motionOk || runningRef.current) return;

    const length = path.getTotalLength();
    const delay = firstRun.current ? 1500 : 0;
    const duration = 1700;
    firstRun.current = false;
    let frame = 0;
    let start = 0;
    const step = (time: number) => {
      start ||= time;
      const elapsed = time - start - delay;
      if (elapsed < 0) {
        frame = requestAnimationFrame(step);
        return;
      }
      const t = Math.min(elapsed / duration, 1);
      const eased = t * t * (3 - 2 * t);
      const point = path.getPointAtLength(eased * length);
      circle.setAttribute("cx", String(point.x));
      circle.setAttribute("cy", String(point.y));
      circle.style.opacity = t < 1 ? "1" : "0";
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      circle.style.opacity = "0";
    };
  }, [activeId, motionOk]);

  /** Moves the train along GitStore's line to a station and resolves on arrival. */
  const travelTo = (x: number, y: number) =>
    new Promise<void>((resolve) => {
      const path = paths.current.gitstore;
      const circle = dot.current;
      if (!path || !circle || !motionOk) {
        resolve();
        return;
      }
      const total = path.getTotalLength();
      let arrive = 0;
      let best = Infinity;
      for (let at = 0; at <= total; at += 4) {
        const point = path.getPointAtLength(at);
        const distance = Math.hypot(point.x - x, point.y - y);
        if (distance < best) {
          best = distance;
          arrive = at;
        }
      }
      const from = dotAt.current;
      const startTime = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - startTime) / STAGE_TRAVEL_MS, 1);
        const eased = t * t * (3 - 2 * t);
        const at = from + (arrive - from) * eased;
        const point = path.getPointAtLength(at);
        circle.setAttribute("cx", String(point.x));
        circle.setAttribute("cy", String(point.y));
        circle.style.opacity = "1";
        if (t < 1) requestAnimationFrame(step);
        else {
          dotAt.current = arrive;
          resolve();
        }
      };
      requestAnimationFrame(step);
    });

  const run = async (event: FormEvent) => {
    event.preventDefault();
    const input = text.trim();
    if (!input || runningRef.current) return;

    runningRef.current = true;
    setRunning(true);
    setCycling(false);
    setActiveId("gitstore");
    setResults({});
    setOutcome("");
    dotAt.current = 0;

    const stations = routes[GITSTORE].stations;
    const pipeline = runPipeline(input, store.current);
    let step = await pipeline.next();
    while (!step.done) {
      const { stage, value } = step.value;
      const station = stations.find((item) => item.label === stage);
      if (station) {
        await travelTo(station.x, station.y);
        glRef.current?.pulse(station.x, station.y);
      }
      setResults((current) => ({ ...current, [stage]: value }));
      step = await pipeline.next();
    }

    setOutcome(
      step.value.duplicate
        ? "Already stored, so the upload was skipped. Change the text to store something new."
        : `Stored and searchable. Run the same text again to watch deduplication skip the upload.`,
    );
    if (dot.current) dot.current.style.opacity = "0";
    runningRef.current = false;
    setRunning(false);
  };

  return (
    <div className="map" ref={root}>
      <div className="map-canvas">
        <svg
          ref={svg}
          viewBox="0 0 1000 700"
          role="img"
          aria-label={`System map of four pipelines. ${active.name} is selected: ${active.stations
            .map((station) => station.label)
            .join(", ")}.`}
        >
          {routes.map((route, index) => {
            const isActive = route.id === activeId;
            return (
              <g
                key={route.id}
                className={`map-route ${isActive ? "is-active" : ""}`}
                style={
                  {
                    "--c": lineColor(route.line),
                    "--i": index,
                  } as React.CSSProperties
                }
              >
                <path className="map-glow" d={route.d} />
                <path
                  ref={(el) => {
                    paths.current[route.id] = el;
                  }}
                  className="map-line"
                  d={route.d}
                  pathLength={1}
                />
                {route.stations.map((station) => (
                  <circle
                    key={station.label}
                    className={`map-station ${
                      isActive && results[station.label] ? "is-done" : ""
                    }`}
                    cx={station.x}
                    cy={station.y}
                    r={11}
                  />
                ))}
                {/* Generous invisible target for pointer users. */}
                <path
                  className="map-hit"
                  d={route.d}
                  onMouseEnter={() => choose(route.id)}
                  onClick={() => choose(route.id)}
                />
              </g>
            );
          })}
          <circle
            ref={dot}
            className="map-train"
            r={9}
            style={{ opacity: 0 }}
          />
        </svg>

        {/* Text labels are HTML so they stay a readable size at any map scale. */}
        <div className="map-labels" aria-hidden="true" key={active.id}>
          {active.stations.map((station) => (
            <span
              key={station.label}
              className={`map-label map-label-${station.side}`}
              style={{
                left: `${station.x / 10}%`,
                top: `${station.y / 7}%`,
              }}
            >
              {station.label}
              {results[station.label] && <code>{results[station.label]}</code>}
            </span>
          ))}
        </div>
      </div>

      <div className="map-lines" role="group" aria-label="Choose a pipeline">
        {routes.map((route) => (
          <button
            key={route.id}
            type="button"
            className="map-pick"
            aria-pressed={route.id === activeId}
            disabled={running}
            style={{ "--c": lineColor(route.line) } as React.CSSProperties}
            onMouseEnter={() => choose(route.id)}
            onFocus={() => choose(route.id)}
            onClick={() => choose(route.id)}
          >
            {route.name}
          </button>
        ))}
      </div>

      <div
        className="map-detail"
        style={{ "--c": lineColor(active.line) } as React.CSSProperties}
      >
        <div className="map-summary" key={active.id}>
          <p>{active.summary}</p>
          <ol className="map-stops">
            {active.stations.map((station, index) => (
              <li
                key={station.label}
                style={{ "--i": index } as React.CSSProperties}
              >
                {station.label}
                {results[station.label] && (
                  <code>{results[station.label]}</code>
                )}
              </li>
            ))}
          </ol>
        </div>
        <Link href={active.href} className="map-open">
          Open {active.name}
        </Link>
      </div>

      <form className="demo" onSubmit={run}>
        <label htmlFor="demo-input">
          Send something through GitStore's pipeline
        </label>
        <div className="demo-row">
          <input
            id="demo-input"
            type="text"
            value={text}
            maxLength={200}
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => setText(event.target.value)}
          />
          <button
            type="submit"
            className="demo-run"
            disabled={running || !text.trim()}
          >
            <Play aria-hidden="true" />
            {running ? "Running" : "Run"}
          </button>
        </div>
        <p className="demo-note" role="status">
          {outcome ||
            "Hashing, deduplication, chunking and indexing really run in your browser. The upload is simulated and nothing leaves this page."}
        </p>
      </form>
    </div>
  );
}
