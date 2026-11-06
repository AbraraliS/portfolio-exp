import { ExternalLink } from "lucide-react";
import { achievementsData } from "@/../utils/Data/achievements";
import { certificationsData } from "@/../utils/Data/certifications";
import { personalData } from "@/../utils/Data/PersonalData";
import Reveal from "../site/Reveal";
import Stop from "../site/Stop";

export default function Recognition() {
  const paper = achievementsData.find((item) => item.type === "Research Paper");
  const others = achievementsData.filter((item) => item !== paper);

  return (
    <section id="recognition" className="section">
      <Stop title="Recognition" />

      {paper && (
        <Reveal className="paper">
          <p className="paper-kind">
            Research paper, {paper.year}, {paper.id}
          </p>
          <h3>{paper.title}</h3>
          <p className="paper-body">{paper.description}</p>
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink"
          >
            Read the paper <ExternalLink aria-hidden="true" />
          </a>
        </Reveal>
      )}

      <div className="recognition-grid">
        <Reveal>
          <h3 className="subhead">Hackathons</h3>
          <ul className="plain-rows">
            {others.map((item) => (
              <li key={item.title}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                  <ExternalLink aria-label="Opens in a new tab" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <h3 className="subhead">Certifications</h3>
          <ul className="plain-rows plain-rows-tight">
            {certificationsData.map((cert) => (
              <li key={cert.name}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  <strong>{cert.name}</strong>
                  <ExternalLink aria-label="Opens in a new tab" />
                </a>
              </li>
            ))}
          </ul>
          <a
            className="text-link"
            href={personalData.certificationsDrive}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open all certificates in Google Drive
          </a>
        </Reveal>
      </div>
    </section>
  );
}
