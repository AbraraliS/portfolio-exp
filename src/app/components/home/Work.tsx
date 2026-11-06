import Stop from "../site/Stop";
import ProjectExplorer from "../projects/ProjectExplorer";

export default function Work() {
  return (
    <section id="work" className="section">
      <Stop
        title="Work"
        intro="Systems I've designed and built, from interview analysis to distributed storage. Colour shows the discipline. Each project also says where it came from and what my role was."
      />
      <ProjectExplorer initialLimit={5} rail />
    </section>
  );
}
