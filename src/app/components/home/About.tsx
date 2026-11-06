import Image from "next/image";
import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import Reveal from "../site/Reveal";
import Stop from "../site/Stop";

export default function About() {
  return (
    <section id="about" className="section">
      <Stop title="About" />
      <Reveal className="about">
        <div className="about-portrait">
          <Image
            src="/profile-portrait.webp"
            alt={`Portrait of ${personalData.name} outdoors on a hilltop`}
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 480px) 280px, 62vw"
          />
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I design and build complete systems. My focus is scalable system
            design, clean architecture and production-ready applications.
          </p>
          <p>
            I work across web, mobile and backend, and I integrate AI and
            automation where it adds real value.
          </p>
          <Link href="/about" className="btn btn-ink">
            <span>More about me</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
