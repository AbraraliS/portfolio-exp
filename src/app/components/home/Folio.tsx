import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import { experiences } from "@/../utils/Data/experience";
import { allPosts, formatPostDate } from "@/../utils/Data/posts";
import Mark from "../site/Mark";
import FolioNav from "./FolioNav";
import Spotlight from "./Spotlight";
import LiveNow from "./LiveNow";

export const SUPPORT_URL = "https://buymeacoffee.com/abraralis";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "live", label: "Live now" },
  { id: "writing", label: "Writing" },
];

/**
 * The second act of the home page, after the cinematic story: About, Experience, Live now and
 * Writing, with a sticky section menu on the left.
 */
export default function Folio() {
  const posts = allPosts().slice(0, 4);

  return (
    <div className="folio">
      <Spotlight />
      <header className="folio-side">
        <div>
          <p className="folio-side-label">
            <Mark size={22} /> {personalData.name}
          </p>
          <FolioNav sections={sections} />
        </div>
        <div className="folio-foot">
          <div className="folio-actions">
            <a className="folio-btn" href={`mailto:${personalData.email}`}>
              Email me
            </a>
            <Link className="folio-btn folio-btn-quiet" href="/support">
              Support my work
            </Link>
          </div>
        </div>
      </header>

      <div className="folio-main">
        <section id="about" className="folio-sec" aria-labelledby="about-h">
          <h2 id="about-h" className="folio-h">
            About
          </h2>
          <p>
            I co-founded <a href="https://criza.dev">Criza Labs</a> and lead how
            we build. I design and write the whole product myself: the
            interface, the data model, the backend, the AI and the release
            pipeline, so nothing gets lost between hand-offs.
          </p>
          <p>
            Four of those products are live today, from a private Android
            companion app to free billing software and browser tools that never
            upload your files. I care about speed on ordinary phones, privacy by
            default and copy that tells the truth.
          </p>
          <p>
            I have been building software since 2022 and shipping complete
            products since 2023. When I am not shipping, I write about what I
            learned, including the mistakes.
          </p>
        </section>

        <section
          id="experience"
          className="folio-sec"
          aria-labelledby="experience-h"
        >
          <h2 id="experience-h" className="folio-h">
            Experience
          </h2>
          <ol className="folio-list">
            {experiences.map((e) => (
              <li key={e.id} className="folio-exp">
                <span className="folio-when">{e.duration}</span>
                <div>
                  <h3 className="folio-card-title">
                    {e.title} · {e.company}
                  </h3>
                  <ul className="folio-points">
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/about" className="folio-more">
            Full profile, education and research →
          </Link>
        </section>

        <LiveNow />

        <section id="writing" className="folio-sec" aria-labelledby="writing-h">
          <h2 id="writing-h" className="folio-h">
            Writing
          </h2>
          <ul className="folio-rows folio-posts">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <span className="folio-muted folio-date">
                    {formatPostDate(post.date)}
                  </span>
                  <span>{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/blog" className="folio-more">
            All articles →
          </Link>
        </section>

        <p className="folio-note">
          Built by me with Next.js and deployed on Vercel. Want something like
          this for your business?{" "}
          <a href="https://criza.dev/contact">Talk to Criza Labs</a>.
        </p>
      </div>
    </div>
  );
}
