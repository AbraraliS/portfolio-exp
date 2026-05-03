"use client";
import { experiences } from "@/../utils/Data/experience";
import { BsPersonWorkspace } from "react-icons/bs";
import { Calendar, Building2, ChevronRight } from "lucide-react";
import SectionReveal from "../SectionReveal";

function Experience() {
  return (
    <div
      id="experience"
      className="relative z-50 py-16 lg:py-32 overflow-hidden"
    >
      {/* Decorative Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex justify-center mb-20 lg:mb-32">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-red-600" />
          <span className="bg-[#050505] border border-red-600/30 w-fit text-white p-3 px-8 text-2xl font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            Professional Journey
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-red-600" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Desktop centre-line */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-600 via-red-950 to-transparent opacity-30" />
        {/* Mobile left-rail line — sits behind the inline dot */}
        <div className="block md:hidden absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-600 via-red-950 to-transparent opacity-30" />

        <div className="flex flex-col gap-12 lg:gap-24">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              <SectionReveal direction={index % 2 === 0 ? "right" : "left"}>

                {/* ── MOBILE LAYOUT (< md) ─────────────────────────────────────────
                    Dot is inline (flex-shrink-0) — sits to the LEFT of content.
                    Date badge is stacked ABOVE the card, both inside the right column.
                    The dot therefore NEVER overlaps the year/date badge.
                ──────────────────────────────────────────────────────────────────── */}
                <div className="flex md:hidden items-start gap-4">
                  {/* Icon dot — fixed 40×40, never shrinks */}
                  <div className="flex-shrink-0 w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-[#050505] border-2 border-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    <BsPersonWorkspace className="text-red-600 w-5 h-5 flex-shrink-0" />
                  </div>

                  {/* Right column: date badge on top, card below */}
                  <div className="flex-1 min-w-0 flex flex-col gap-3">
                    {/* Date badge */}
                    <div className="flex">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="group relative p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-red-600/50 transition-all duration-500 shadow-xl hover:shadow-red-600/10 overflow-hidden">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 break-words">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
                            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="break-words min-w-0">{exp.company}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {exp.details?.map((detail, idx) => (
                            <div key={idx} className="flex gap-2 items-start group/item">
                              <ChevronRight className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" />
                              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed group-hover/item:text-slate-200 transition-colors break-words min-w-0">
                                {detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/20 via-transparent to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* ── DESKTOP LAYOUT (md+) ─────────────────────────────────────────
                    Alternating two-column layout, dot absolutely centred.
                ──────────────────────────────────────────────────────────────────── */}
                <div
                  className={`hidden md:flex items-center gap-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Centred dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-[#050505] border-2 border-red-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    <BsPersonWorkspace className="text-red-600 w-5 h-5 flex-shrink-0" />
                  </div>

                  {/* Date badge */}
                  <div className={`w-1/2 flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-slate-400 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="w-1/2 min-w-0">
                    <div className="group relative p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-red-600/50 transition-all duration-500 shadow-xl hover:shadow-red-600/10 overflow-hidden">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-red-500 font-semibold">
                            <Building2 className="w-4 h-4 flex-shrink-0" />
                            <span className="break-words min-w-0">{exp.company}</span>
                          </div>
                        </div>
                        <div className="space-y-3 mt-2">
                          {exp.details?.map((detail, idx) => (
                            <div key={idx} className="flex gap-3 items-start group/item">
                              <ChevronRight className="w-4 h-4 text-red-600 mt-1 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" />
                              <p className="text-slate-400 text-sm lg:text-base leading-relaxed group-hover/item:text-slate-200 transition-colors break-words min-w-0">
                                {detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-600/20 via-transparent to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

              </SectionReveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;
