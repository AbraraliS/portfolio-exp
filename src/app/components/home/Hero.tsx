import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import { projectsData } from "@/../utils/Data/projects-data";
import SystemMap from "./SystemMap";

const expertise = [
  { area: "Frontend", tools: "React, Next.js, TypeScript" },
  { area: "Backend", tools: "Spring Boot, Node.js, API design" },
  { area: "AI", tools: "LLM APIs, automation, Python" },
  { area: "Mobile", tools: "React Native, Expo" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-light" />
        <span className="hero-dots" />
      </div>
      <canvas className="hero-canvas" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-top">
          <p className="hero-title">
            {personalData.name}, full stack and systems engineer
          </p>
          <p className="hero-status">
            <span className="hero-pulse" aria-hidden="true" />
            Available for roles and freelance work, {personalData.address}
          </p>
        </div>

        <h1 className="hero-name">
          <span className="sr-only">{personalData.name}: </span>
          <span className="hero-word">
            <span>I build the</span>
          </span>{" "}
          <span className="hero-word hero-word-line">
            <span>whole line.</span>
            <svg
              className="hero-underline"
              viewBox="0 0 400 20"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 10H400" pathLength={1} />
            </svg>
          </span>
        </h1>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-role">
              Interfaces, mobile apps, backend architecture and AI workflows,
              designed and built as one connected system.
            </p>
            <div className="hero-actions">
              <Link href="/#work" className="btn btn-signal">
                <span>See my work</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                <span>Contact me</span>
              </Link>
            </div>
            <dl className="hero-skills">
              {expertise.map((item) => (
                <div key={item.area}>
                  <dt>{item.area}</dt>
                  <dd>{item.tools}</dd>
                </div>
              ))}
            </dl>
            <Link href="/#work" className="hero-next">
              <span className="hero-next-line" aria-hidden="true">
                <ArrowDown />
              </span>
              {projectsData.length} projects on this network
            </Link>
          </div>
          <SystemMap />
        </div>
      </div>
    </section>
  );
}
