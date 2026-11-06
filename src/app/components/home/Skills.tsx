import Link from "next/link";
import { skillGroups } from "@/../utils/Data/skills";
import { projectsData } from "@/../utils/Data/projects-data";
import { projectName } from "@/../utils/project-helpers";
import Reveal from "../site/Reveal";
import Stop from "../site/Stop";

const normalise = (value: string) =>
  value
    .toLowerCase()
    .replace(/\.js$/, "")
    .replace(/[^a-z0-9]/g, "");

/** Projects whose listed tools exactly name one of the skills in a group. */
const provenIn = (skills: string[]) => {
  const wanted = new Set(skills.map(normalise));
  return projectsData.filter((project) =>
    project.tools?.some((tool) => wanted.has(normalise(tool))),
  );
};

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Stop
        title="Skills"
        intro="Where a skill appears in a project's stack, the project is linked next to it."
      />
      <Reveal className="skills">
        {skillGroups.map((group) => {
          const projects = provenIn(group.skills);
          return (
            <div key={group.name} className="skill-row">
              <h3>{group.name}</h3>
              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <p className="skill-proof">
                {projects.length > 0 && (
                  <>
                    <span>Used in </span>
                    {projects.slice(0, 4).map((project, index) => (
                      <span key={project.id}>
                        {index > 0 && ", "}
                        <Link href={`/projects/${project.id}`}>
                          {projectName(project)}
                        </Link>
                      </span>
                    ))}
                  </>
                )}
              </p>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
