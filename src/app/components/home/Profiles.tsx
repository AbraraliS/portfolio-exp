import { ExternalLink } from "lucide-react";
import { projectsData } from "@/../utils/Data/projects-data";
import { projectName, projectSourceUrl } from "@/../utils/project-helpers";
import Reveal from "../site/Reveal";
import Stop from "../site/Stop";
import { socials } from "../site/socials";

export default function Profiles() {
  const repos = projectsData.filter(projectSourceUrl);

  return (
    <section id="profiles" className="section">
      <Stop title="Profiles" />
      <Reveal className="profiles">
        <ul className="profile-list">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                <social.icon aria-hidden="true" className="profile-icon" />
                <span className="profile-name">{social.label}</span>
                <span className="profile-handle">{social.handle}</span>
                <span className="profile-note">{social.note}</span>
                <ExternalLink
                  aria-label="Opens in a new tab"
                  className="profile-out"
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="repos">
          <h3 className="subhead">Source code from this portfolio</h3>
          <ul>
            {repos.map((project) => (
              <li key={project.id}>
                <a
                  href={projectSourceUrl(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {projectName(project)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
