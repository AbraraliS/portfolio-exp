import { notFound } from "next/navigation";
import { projectsData } from "@/../utils/Data/projects-data";
import { getProjectImages } from "@/../utils/get-project-images";
import FeaturedProjects from "@/app/components/projects/_components/FeaturedProjects";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import ProjectGallery from "@/app/components/projects/_components/ProjectGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Globe,
  User,
  ShieldCheck,
  Cpu,
  Calendar,
  ArrowLeft,
  Play,
  BarChart3,
  Terminal,
  Layers,
  Settings,
  Lock,
  Zap,
  Box,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getSkillIcon, getSkillColor } from "@/../utils/skill-icons";

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

type Props = {
  params: Promise<{ id: string }>;
};

const ProjectDetails = async ({ params }: Props) => {
  const { id } = await params;
  const projectData = projectsData.find((p) => p.id.toString() === id);

  if (!projectData) {
    notFound();
  }

  const dynamicImages = getProjectImages(
    String(projectData.id),
    projectData.images || [],
  );
  const project = { ...projectData, images: dynamicImages };

  return (
    <div className="min-h-screen  text-white py-12 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-8 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#050505] shadow-2xl mb-12">
          <div className="absolute inset-0 z-0">
            <Image
              src={
                project.thumbnail ||
                project.images?.[0] ||
                "/placeholder/placeholder.png"
              }
              alt={project.name}
              fill
              className="object-cover opacity-20 blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 p-8 lg:p-16 flex flex-col lg:flex-row gap-12 items-center">
            {/* Project Banner Image */}
            <div className="w-full lg:w-1/2 aspect-video relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-[#050505]">
              {project.thumbnail || project.images?.[0] ? (
                <ZoomableImage
                  src={project.thumbnail || project.images[0]}
                  alt={project.name}
                  imageClassName="transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-red-950/20 to-black p-8">
                  <Terminal className="w-16 h-16 text-red-500/40" />
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs text-center">
                    {project.name}
                  </p>
                </div>
              )}
            </div>

            {/* Project Header Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="secondary"
                  className="bg-red-500/10 text-red-500 hover:bg-black border-red-500/20 px-3 py-1 font-bold tracking-wider"
                >
                  {project.date || "2024"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-red-950/20 text-red-400 hover:bg-black border-red-900/30 px-3 py-1 font-bold tracking-wider"
                >
                  {project.role}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-slate-400 leading-tight break-words">
                {project.fullName || project.name}
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium italic">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 max-w-full">
                {(() => {
                  const links = [
                    (project.live || project.demo) && {
                      label: "Live Preview",
                      url: project.live || project.demo,
                      icon: <Globe className="w-5 h-5" />,
                      className: "bg-red-600 hover:bg-red-700 text-white",
                    },
                    (project.github || project.code) && {
                      label: "View Source",
                      url: project.github || project.code,
                      icon: <Code className="w-5 h-5" />,
                      className:
                        "border-white/10 bg-white/5 hover:bg-red-950/20 hover:text-red-500 hover:border-red-500/30 text-white",
                    },
                    project.videos?.[0] && {
                      label: "Watch Demo",
                      url: project.videos[0],
                      icon: <Play className="w-5 h-5" />,
                      className:
                        "border-white/10 bg-white/5 hover:bg-red-600/10 hover:text-red-500 hover:border-red-500/30 text-white",
                    },
                    project.docs && {
                      label: "Documentation",
                      url: project.docs,
                      icon: <FileText className="w-5 h-5" />,
                      className:
                        "border-white/10 bg-white/5 hover:bg-red-600/10 hover:text-red-500 hover:border-red-500/30 text-white",
                    },
                  ].filter(
                    (
                      link,
                    ): link is Exclude<
                      typeof link,
                      false | "" | 0 | null | undefined
                    > => !!link,
                  );

                  return links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant={
                          link.label === "Live Preview" ? "default" : "outline"
                        }
                        className={`${link.className} px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 active:scale-95 flex gap-2 font-bold uppercase tracking-widest`}
                      >
                        {link.icon}
                        {link.label}
                      </Button>
                    </Link>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 flex flex-col gap-16">
            {/* Video Demo Embed */}
            {project.videos?.[0] && getYouTubeEmbedUrl(project.videos[0]) && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Play className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    Video Demonstration
                  </h2>
                </div>
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                  <iframe
                    src={getYouTubeEmbedUrl(project.videos[0]) || ""}
                    title={`${project.name} Video Demo`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </section>
            )}

            {/* Overview */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <User className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                </div>
                <h2 className="text-3xl font-black text-white">
                  Project Overview
                </h2>
              </div>
              <div className="flex flex-col gap-8">
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  {project.description}
                </p>
                {project.images?.find(
                  (img) =>
                    img.includes("dashboard") || img.includes("overview"),
                ) || project.images?.[0] ? (
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-[#050505]">
                    <ZoomableImage
                      src={
                        project.images.find(
                          (img) =>
                            img.includes("dashboard") ||
                            img.includes("overview"),
                        ) || project.images[0]
                      }
                      alt={`${project.name} Overview`}
                      imageClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : null}
              </div>
            </section>

            {/* Architecture */}
            {project.system_architecture && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Cpu className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    System Architecture
                  </h2>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs">
                        Architecture Type
                      </span>
                      <p className="text-white text-xl font-bold">
                        {project.system_architecture.type}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      {project.system_architecture.components.map(
                        (comp, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                          >
                            <p className="text-slate-300 text-sm font-medium">
                              {comp}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <span className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs">
                        System Flow
                      </span>
                      <p className="text-slate-400 italic mt-2 font-medium">
                        {project.system_architecture.flow}
                      </p>
                    </div>
                  </div>
                  {project.images?.some((img) =>
                    img.includes("architecture"),
                  ) && (
                    <div className="flex flex-col gap-4">
                      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-[#050505]">
                        <ZoomableImage
                          src={
                            project.images.find((img) =>
                              img.includes("architecture"),
                            ) as string
                          }
                          alt={`${project.name} Architecture`}
                          imageClassName="transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-slate-500 text-sm italic text-center font-medium">
                        {project.id === "tips" || project.name.includes("TIPS")
                          ? "Temporal multi-stage pipeline combining signal processing and LLM-based evaluation"
                          : `${project.name} System Architecture Diagram`}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Core Systems Section */}
            {project.core_systems && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Layers className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    Core Engineering Systems
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-red-500">
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Upload Pipeline
                      </span>
                    </div>
                    <p className="text-white text-sm font-bold leading-relaxed">
                      {project.core_systems.upload_pipeline}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-red-500">
                      <Box className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Cache Hierarchy
                      </span>
                    </div>
                    <p className="text-white text-sm font-bold leading-relaxed">
                      {project.core_systems.cache_hierarchy}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-red-500">
                      <Globe className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Search Engine
                      </span>
                    </div>
                    <p className="text-white text-sm font-bold leading-relaxed">
                      {project.core_systems.search}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Security & Performance Grid */}
            {(project.security || project.performance) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.security && (
                  <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Security</h3>
                    </div>
                    <ul className="space-y-3">
                      {project.security.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-slate-400 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {project.performance && (
                  <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Performance
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {project.performance.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-slate-400 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {/* Capabilities Section */}
            {project.capabilities && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <ShieldCheck className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    System Capabilities
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4"
                    >
                      <div className="w-2 h-2 rounded-full bg-red-600" />
                      <span className="text-slate-300 font-bold">{cap}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Deployment Section */}
            {project.deployment && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Settings className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    Deployment & Portability
                  </h2>
                </div>
                <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="text-red-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                      Supported Platforms
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {project.deployment.platforms.map((plat, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-white/5 text-slate-300 border-white/10 px-4 py-2"
                        >
                          {plat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.deployment.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#050505] border border-white/5"
                      >
                        <p className="text-slate-400 text-xs font-medium italic">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Analytics Section */}
            {project.analytics && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <BarChart3 className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    {project.id === "8" || project.name.includes("InvenTrack")
                      ? "System Modules & Visual Insights"
                      : "Visual Analytics & Insights"}
                  </h2>
                </div>
                <div className="flex flex-col gap-8">
                  <p className="text-slate-300 text-lg leading-relaxed font-medium">
                    {project.analytics.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.images
                      ?.filter(
                        (img) =>
                          img.includes("analytics") ||
                          img.includes("charts") ||
                          img.includes("dashboard") ||
                          img.includes("analysis") ||
                          img.includes("products") ||
                          img.includes("inventory") ||
                          img.includes("invoice") ||
                          img.includes("barcode") ||
                          img.includes("auth"),
                      )
                      .map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group bg-[#050505]"
                        >
                          <ZoomableImage
                            src={img}
                            alt={`${project.name} Module ${idx + 1}`}
                            imageClassName="transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                            <p className="text-white text-[10px] font-bold uppercase tracking-widest text-center">
                              {img.includes("dashboard")
                                ? "Admin Dashboard"
                                : img.includes("products") ||
                                    img.includes("inventory")
                                  ? "Inventory Management"
                                  : img.includes("invoice")
                                    ? "Billing & Invoicing"
                                    : img.includes("barcode")
                                      ? "Barcode System"
                                      : img.includes("analytics")
                                        ? "Data Analytics"
                                        : img.includes("auth")
                                          ? "Security & Authentication"
                                          : "System Module"}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.analytics.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium text-center"
                      >
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Semantic Evaluation & Q&A (Specific to TIPS but kept as generic check) */}
            {project.id.toString() === "1" && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <ShieldCheck className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    Semantic Evaluation & Q&A
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                    <ZoomableImage
                      src="/projects/tips/tips-analysis.png"
                      alt="TIPS Analysis"
                      imageClassName="transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                      <p className="text-white text-xs font-bold uppercase tracking-widest text-center">
                        Multimodal Analysis
                      </p>
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                    <ZoomableImage
                      src="/projects/tips/tips-qa.png"
                      alt="TIPS Q&A"
                      imageClassName="transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                      <p className="text-white text-xs font-bold uppercase tracking-widest text-center">
                        Automated Q&A Pairing
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Features */}
            {project.features && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <ShieldCheck className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    Core Features
                  </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(project.features || []).map((feature, index) => (
                    <li
                      key={index}
                      className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-red-500/[0.03] hover:border-red-500/20 transition-all duration-300 flex gap-4"
                    >
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] shrink-0 group-hover:scale-125 transition-transform" />
                      <p className="text-slate-300 text-base leading-relaxed font-medium">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {/* Pipeline Breakdown */}
            {project.pipeline && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Cpu className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    6-Stage Pipeline Breakdown
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(project.pipeline || []).map((stage, index) => (
                    <div
                      key={index}
                      className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-red-500/30 transition-all group overflow-hidden"
                    >
                      <span className="absolute -right-4 -bottom-4 text-7xl font-black text-white/[0.03] group-hover:text-red-500/[0.05] transition-colors">
                        0{index + 1}
                      </span>
                      <h4 className="text-red-500 font-bold uppercase tracking-widest text-[10px] mb-2">
                        Stage {index + 1}
                      </h4>
                      <p className="text-white font-bold relative z-10">
                        {stage}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Impact */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <ShieldCheck className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                </div>
                <h2 className="text-3xl font-black text-white">
                  Project Impact
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {project.highlights?.map((highlight, index) => (
                  <li
                    key={index}
                    className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-red-500/[0.03] hover:border-red-500/20 transition-all duration-300 flex gap-4"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-slate-300 text-lg leading-relaxed font-medium">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-900/10 flex items-center justify-center border border-red-900/20">
                    <Calendar className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    Visual Showcase
                  </h2>
                </div>

                <ProjectGallery
                  images={project.images}
                  projectName={project.name}
                />
              </section>
            )}
          </div>

          {/* Sidebar (Right) */}
          <aside className="flex flex-col gap-8">
            {/* Tech Stack Card */}
            <Card className="bg-[#050505]/20 border-white/10 rounded-3xl overflow-hidden lg:sticky lg:top-24 shadow-2xl">
              <CardContent className="p-8 flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Technologies
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(project.tools || []).map((tool, index) => {
                      const Icon = getSkillIcon(tool);
                      const color = getSkillColor(tool);
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:border-red-500/30 hover:bg-white/10 transition-all cursor-default group"
                        >
                          <Icon
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color }}
                          />
                          <span className="text-slate-300 font-semibold text-[11px] uppercase tracking-wider group-hover:text-white transition-colors">
                            {tool}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-900/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Project Details
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Role</span>
                      <span className="text-slate-300 font-bold uppercase tracking-widest text-[10px] bg-white/5 px-2 py-1 rounded-md">
                        {project.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">
                        Completed
                      </span>
                      <span className="text-slate-300 font-bold">
                        {project.date || "2024"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href="/#contact" className="w-full">
                    <Button className="w-full bg-red-600/10 border border-red-600/20 hover:bg-red-600 hover:text-white py-6 rounded-xl text-red-500 font-bold uppercase tracking-widest text-xs transition-all duration-300 group flex gap-2 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                        Discuss This Project
                      </span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Similar Projects */}
        <div className="mt-32 pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
                Explore More Work
              </h2>
              <p className="text-slate-400 text-lg font-medium">
                Deep dive into other high-performance solutions.
              </p>
            </div>
            <Link
              href="/#projects"
              className="text-red-500 font-black uppercase tracking-[0.2em] text-sm hover:text-red-400 transition-colors flex items-center gap-2 group"
            >
              View Full Archive{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
          <FeaturedProjects excludeId={String(project.id)} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
