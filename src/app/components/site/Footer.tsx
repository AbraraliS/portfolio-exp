import Link from "next/link";
import { allPosts } from "@/../utils/Data/posts";
import { personalData } from "@/../utils/Data/PersonalData";
import { projectName, projectsInOrder } from "@/../utils/project-helpers";
import Mark from "./Mark";
import Reveal from "./Reveal";
import { socials } from "./socials";

const FEATURED_PROJECTS = 4;
const LATEST_POSTS = 3;

const pages = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/about#experience" },
  { label: "Contact", href: "/contact" },
  ...(personalData.resume
    ? [{ label: "Resume", href: personalData.resume }]
    : []),
];

export default function Footer() {
  const projects = projectsInOrder().slice(0, FEATURED_PROJECTS);
  const posts = allPosts().slice(0, LATEST_POSTS);

  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-inner">
        <Reveal className="footer-route">
          <span aria-hidden="true" className="footer-route-line" />
          <div className="footer-top">
            <div className="footer-intro">
              <Link
                href="/"
                className="footer-brand"
                aria-label="Abrarali Sunasara, home"
              >
                <Mark size={52} />
              </Link>
              <p className="footer-lead">
                Full stack and systems engineer in Bengaluru, building complete
                products from interface to AI workflow.
              </p>
              <Link href="/contact" className="btn btn-signal">
                <span>Contact me</span>
              </Link>
            </div>

            <nav aria-label="Footer" className="footer-columns">
              <div>
                <h2>Pages</h2>
                <ul>
                  {pages.map((page) => (
                    <li key={page.href}>
                      <Link href={page.href}>{page.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Projects</h2>
                <ul>
                  {projects.map((project) => (
                    <li key={project.id}>
                      <Link href={`/projects/${project.id}`}>
                        {projectName(project)}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/projects" className="footer-all">
                      All projects
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-col-blog">
                <h2>Blog</h2>
                <ul>
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/blog" className="footer-all">
                      All articles
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-col-contact">
                <h2>Contact</h2>
                <ul>
                  <li>
                    <a href={`mailto:${personalData.email}`}>
                      {personalData.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${personalData.phone.replace(/\s/g, "")}`}>
                      {personalData.phone}
                    </a>
                  </li>
                  <li className="footer-plain">{personalData.address}</li>
                </ul>
              </div>
            </nav>
          </div>
        </Reveal>

        <ul className="footer-socials">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
              >
                <social.icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div
          className="footer-wordmark"
          data-name={personalData.name}
          aria-hidden="true"
        />

        <div className="footer-base">
          <small>
            &copy; {new Date().getFullYear()} {personalData.name}
          </small>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/sitemap">Sitemap</Link>
            <a href="#main">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
