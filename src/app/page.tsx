import About from "./components/about/page";
import Contact from "./components/contact/index";
import Experience from "./components/experience/page";
import Education from "./components/education/page";
import HeroSection from "./components/hero-section/page";
import Projects from "./components/projects/index";
import Certifications from "./components/certifications/page";
import Achievements from "./components/achievements/index";
import Skills from "./components/skills/page";
import SectionReveal from "./components/SectionReveal";

import "./css/card.css";
export default function Home() {
  return (
    <>
      <div className="container">
        <HeroSection />

        <SectionReveal>
          <About />
        </SectionReveal>

        <SectionReveal>
          <Experience />
        </SectionReveal>

        <SectionReveal>
          <Education />
        </SectionReveal>

        <SectionReveal>
          <Skills />
        </SectionReveal>

        <SectionReveal>
          <Projects />
        </SectionReveal>

        <SectionReveal>
          <Certifications />
        </SectionReveal>

        <SectionReveal>
          <Achievements />
        </SectionReveal>

        <SectionReveal>
          <Contact />
        </SectionReveal>
      </div>
    </>
  );
}
