"use client";
import { projectsData } from "@/../utils/Data/projects-data";
import { MoveUpRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import ProjectCard from "./project-card";
import { useState, useEffect } from "react";

const Projects = () => {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mainProjects = projectsData
    .filter((p) => p.isMain)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));

  const projectsToRender = isMobile 
    ? (showAllMobile ? mainProjects : mainProjects.slice(0, 1))
    : mainProjects.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative z-50 py-16 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="flex justify-center mb-20 lg:mb-32">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-red-600"></span>
          <span className="bg-[#050505] border border-red-600/30 w-fit text-white p-3 px-8 text-2xl font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            Projects Showcase
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-red-600"></span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-12 lg:gap-20">
          <div className="text-center">
            <p className="text-red-500 text-sm font-bold uppercase tracking-[0.4em] mb-4">
              Production-Ready Systems
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter break-words">
              Scalable{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                Architecture
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed font-medium mx-auto break-words">
              A selection of complex systems and architectures, engineered for high availability, scalability, and seamless integration.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {projectsToRender.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Mobile Toggle Button */}
          {isMobile && projectsData.length > 1 && (
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="sm:hidden w-full py-4 rounded-xl border border-red-600/30 bg-white/5 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {showAllMobile ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>View More Projects <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          )}

          <Link href="/projects" className="group mt-8">
            <button className="relative px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-900 text-white font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.3)] flex items-center gap-2 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                All Projects <MoveUpRight className="w-4 h-4" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
