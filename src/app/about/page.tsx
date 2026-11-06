import type { Metadata } from "next";
import Image from "next/image";
import { personalData } from "@/../utils/Data/PersonalData";
import { servicesData } from "@/../utils/Data/services";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import Journey from "../components/home/Journey";
import Profiles from "../components/home/Profiles";
import Recognition from "../components/home/Recognition";
import JsonLd from "../components/site/JsonLd";
import Reveal from "../components/site/Reveal";
import Stop from "../components/site/Stop";

const description =
  "About Abrarali Sunasara: full stack and systems engineer in Bengaluru. Experience, education, a published research paper, certifications and professional profiles.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  ...shareMeta({
    title: "About | Abrarali Sunasara",
    description: description,
    path: "/about",
    type: "profile",
  }),
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <header className="page-head">
        <div className="page-head-inner about-hero">
          <div>
            <h1>About me</h1>
            <p>
              I design and build complete systems, from frontend interfaces and
              mobile apps to backend architecture, APIs and AI-driven workflows.
            </p>
          </div>
          <div className="about-portrait">
            <Image
              src="/profile-portrait.webp"
              alt={`Portrait of ${personalData.name} outdoors on a hilltop`}
              fill
              priority
              sizes="(min-width: 768px) 320px, 62vw"
            />
          </div>
        </div>
      </header>

      <div className="route">
        <section id="approach" className="section">
          <Stop title="How I work" />
          <Reveal className="about-copy about-copy-wide">
            <p className="about-lead">
              My focus is scalable system design, clean architecture and
              production-ready applications.
            </p>
            <p>
              I work across web, mobile and backend, integrating AI and
              automation where it adds real value. I've worked on client and
              independent projects since 2022, alongside a Master of Computer
              Applications at REVA University in Bengaluru, with a CGPA of 9.44.
            </p>
          </Reveal>
          <Reveal>
            <h3 className="subhead subhead-spaced">What I can take on</h3>
            <dl className="services">
              {servicesData.map((service) => (
                <div key={service.service_title}>
                  <dt>{service.service_title}</dt>
                  <dd>{service.description}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
        <Journey />
        <Recognition />
        <Profiles />
      </div>
    </>
  );
}
