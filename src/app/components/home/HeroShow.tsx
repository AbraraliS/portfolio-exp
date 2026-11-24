import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import { socials } from "../site/socials";
import KeeStageLazy from "./KeeStageLazy";

const STACK = [
  "Kotlin",
  "Jetpack Compose",
  "Next.js",
  "React",
  "TypeScript",
  "Astro",
  "Flutter",
  "Node.js",
  "Spring Boot",
  "Python",
  "LLM APIs",
  "Cloudflare",
  "SQLite",
  "Three.js",
];

/**
 * The poster hero: colour orbs over a fine grid and grain, the name lit by a sweeping light, and
 * Kee the 3D companion on a lit stage. One entrance on load; a slow stack marquee at the foot.
 */
export default function HeroShow() {
  return (
    <section className="show" aria-labelledby="show-name">
      <div className="show-ground" aria-hidden="true">
        <span className="show-orb show-orb-mint" />
        <span className="show-orb show-orb-red" />
        <span className="show-orb show-orb-blue" />
        <span className="show-grid" />
      </div>

      <div className="show-inner">
        <div className="show-copy">
          <p className="show-chip">
            <span className="folio-dot" aria-hidden="true" /> Co-founder, Criza
            Labs · Bengaluru, India
          </p>
          <h1 id="show-name" className="show-name">
            <span className="show-name-line">AbrarAli S.</span>
          </h1>
          <p className="show-tag">
            I build <em>whole</em> products.
            <span>
              {" "}
              Android, web, backend and AI, from the first sketch to the shipped
              release.
            </span>
          </p>
          <div className="show-actions">
            <Link href="/#products" className="show-btn">
              See my work <span aria-hidden="true">→</span>
            </Link>
            <a
              href={`mailto:${personalData.email}`}
              className="show-btn show-btn-ghost"
            >
              {personalData.email}
            </a>
          </div>
          <dl className="show-stats">
            <div>
              <dt>Products live</dt>
              <dd>04</dd>
            </div>
            <div>
              <dt>Free tools shipped</dt>
              <dd>67</dd>
            </div>
            <div>
              <dt>Building since</dt>
              <dd>2022</dd>
            </div>
          </dl>
          <ul className="show-socials" aria-label="Profiles">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${social.label} (opens in a new tab)`}
                >
                  <social.icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <KeeStageLazy />
      </div>

      <div className="show-marquee" aria-label="Tools I build with">
        <div className="show-marquee-track">
          {[...STACK, ...STACK].map((item, i) => (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= STACK.length ? "true" : undefined}
            >
              {item}
              <i aria-hidden="true">◆</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
