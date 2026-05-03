import About from "./components/about/page";
import Contact from "./components/contact/index";
import Experience from "./components/experience/page";
import Education from "./components/education/page";
import HeroSection from "./components/hero-section/page";
import Projects from "./components/projects/index";
import Certifications from "./components/certifications/page";
import Achievements from "./components/achievements/index";
import Skills from "./components/skills/page";

import "./css/card.css";

// NOTE: SectionReveal wraps have been intentionally removed from the page-level
// composition. Each section already handles its own internal scroll animations
// (GSAP ScrollTrigger on individual cards/elements). A page-level SectionReveal
// was setting opacity:0 on entire sections, causing them to be invisible if
// ScrollTrigger misfired on mobile or if the user scrolled too quickly.
export default function Home() {
  return (
    <>
      <div className="container">
        <HeroSection />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <Contact />
      </div>
    </>
  );
}
