import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import Reveal from "../site/Reveal";

export default function Closing() {
  return (
    <section className="closing">
      <div className="closing-light" aria-hidden="true" />
      <Reveal className="closing-inner">
        <h2>Let's build real systems</h2>
        <p>
          I'm available for engineering roles and freelance work. Tell me what
          you're building.
        </p>
        <div className="closing-actions">
          <Link href="/contact" className="btn btn-signal">
            <span>Contact me</span>
          </Link>
          <a href={`mailto:${personalData.email}`} className="closing-email">
            {personalData.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
