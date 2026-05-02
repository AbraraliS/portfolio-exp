"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectCardProps } from "@/Types/types";
import { getSkillIcon, getSkillColor } from "@/../utils/skill-icons";
import { ChevronUp, Code, ExternalLink, Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";

const ProjectCard = ({ project }: ProjectCardProps) => {
  const firstImage = project.thumbnail || project.images?.[0];
  const [showAllTags, setShowAllTags] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const maxVisibleTags = 5;
  const tools = project.tools || [];
  const hasMoreTags = tools.length > maxVisibleTags;
  const visibleTools = showAllTags
    ? tools
    : tools.slice(0, maxVisibleTags);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Helper function to check if project is less than a month old
  const isNewProject = (dateString?: string) => {
    if (!dateString) return false;

    try {
      const projectDate = new Date(dateString);
      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);

      return projectDate >= oneMonthAgo && projectDate <= currentDate;
    } catch {
      return false;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.1), transparent 40%)`,
        }}
      />

      <Card className="relative flex flex-col h-full justify-between border border-white/10 bg-[#050505]/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:border-red-600/50 hover:shadow-red-600/10">
        <div className="flex-1">
          <div className="relative overflow-hidden aspect-video">
            {project.videos?.[0] && !project.videos[0].includes("youtu") ? (
              <video
                src={project.videos[0]}
                className="w-full h-full object-cover"
                muted
                loop
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
            ) : firstImage ? (
              <Image
                src={firstImage}
                width={800}
                height={450}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <span className="text-slate-600">{project.name}</span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />

            {isNewProject(project.date) && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-900 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse z-10 border border-white/10">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold tracking-wider">
                  NEW
                </span>
              </div>
            )}
          </div>

          <CardHeader className="p-6 pb-2">
            <div className="flex flex-col gap-3">
              {project.type && (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-widest">
                    {project.type}
                  </span>
                </div>
              )}
              <Link
                href={`/projects/${project.id}`}
                className="group/title inline-block"
              >
                <CardTitle className="text-xl font-bold text-white group-hover/title:text-red-500 transition-colors flex items-start gap-2 tracking-tight break-words leading-tight">
                  <span className="flex-1">{project.name}</span>
                  <ExternalLink className="w-4 h-4 mt-0.5 opacity-0 shrink-0 group-hover/title:opacity-100 transition-all text-red-500" />
                </CardTitle>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="px-6 flex-1">
            <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium italic line-clamp-2">
              {project.description}
            </p>
            {project.system_architecture && (
              <div className="mb-4 text-xs">
                <p className="text-white font-bold mb-2 uppercase tracking-wider text-[10px]">System Architecture</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 overflow-hidden">
                  <p className="text-red-400 font-medium mb-1 break-words">{project.system_architecture.type}</p>
                  <p className="text-slate-400 mb-2 break-words">{project.system_architecture.components.join(" • ")}</p>
                  <p className="text-slate-500 italic break-words">Flow: {project.system_architecture.flow}</p>
                </div>
              </div>
            )}
            {project.api_schema && (
              <div className="mb-6 text-xs">
                <p className="text-white font-bold mb-2 uppercase tracking-wider text-[10px]">API Schema</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-2">
                  {Object.entries(project.api_schema).map(([key, routes]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-red-400 font-medium capitalize mb-1">{key} Endpoints:</span>
                      <div className="flex flex-wrap gap-1">
                        {routes.map((route, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[#050505] text-slate-400 rounded-md border border-white/5 text-[10px] font-mono">
                            {route}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {visibleTools.map((tool, index) => {
                const Icon = getSkillIcon(tool);
                const color = getSkillColor(tool);
                return (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-white/5 border border-white/10 text-slate-400 rounded-lg hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all duration-300"
                  >
                    <Icon className="w-3 h-3 shrink-0" style={{ color }} />
                    {tool}
                  </span>
                );
              })}
              {hasMoreTags && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllTags(!showAllTags);
                  }}
                  className="flex items-center gap-1 text-red-500 hover:text-red-400 text-[11px] font-black transition-colors pl-1 uppercase tracking-widest"
                >
                  {showAllTags ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    `+${tools.length - maxVisibleTags}`
                  )}
                </button>
              )}
            </div>
          </CardContent>
        </div>

        <CardFooter className="p-6 pt-2 flex flex-col gap-3">
          {(project.demo || project.live || project.code || project.videos?.[0]) && (
            <div className="flex flex-wrap gap-3 w-full">
              {(project.demo || project.live) && (
                <Link
                  href={project.demo || project.live || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px]"
                >
                  <Button
                    className="w-full h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-red-600 text-white hover:border-red-500 shadow-xl hover:shadow-red-600/20"
                  >
                    <Globe className="w-4 h-4" />
                    Live Demo
                  </Button>
                </Link>
              )}
              {project.code && (
                <Link
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px]"
                >
                  <Button
                    className="w-full h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-red-950 text-white hover:border-red-800 shadow-xl hover:shadow-red-950/20"
                  >
                    <Code className="w-4 h-4" />
                    GitHub
                  </Button>
                </Link>
              )}
            </div>
          )}

          {project.videos?.[0] && (
            <Link
              href={project.videos[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white hover:bg-red-600/20 hover:border-red-500 transition-all duration-300 flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Video Demo
              </Button>
            </Link>
          )}
          
          <Link href={`/projects/${project.id}`} className="w-full">
            <Button className="w-full h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              View Technical Details <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
