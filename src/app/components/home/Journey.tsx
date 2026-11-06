import { educations } from "@/../utils/Data/educations";
import { experiences } from "@/../utils/Data/experience";
import { lineStyle } from "@/../utils/site";
import Reveal from "../site/Reveal";
import Stop from "../site/Stop";

export default function Journey() {
  return (
    <section id="experience" className="section">
      <Stop title="Experience" />
      <div className="journey">
        <Reveal>
          <h3 className="subhead">Work</h3>
          <ol className="timeline" style={lineStyle("systems")}>
            {experiences.map((job) => (
              <li key={job.id}>
                <p className="timeline-when">{job.duration}</p>
                <h4>{job.title}</h4>
                <p className="timeline-where">{job.company}</p>
                <ul>
                  {job.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal>
          <h3 className="subhead">Education</h3>
          <ol className="timeline" style={lineStyle("web")}>
            {educations.map((school) => (
              <li key={school.id}>
                <p className="timeline-when">
                  {school.duration.replace(" - ", " – ")}
                </p>
                <h4>{school.title}</h4>
                <p className="timeline-where">{school.institution}</p>
                <p className="timeline-grade">CGPA {school.cgpa}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
