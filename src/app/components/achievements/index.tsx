"use client";
import { achievementsData } from "@/../utils/Data/achievements";
import { Trophy, Star, ExternalLink } from "lucide-react";
import SectionReveal from "../SectionReveal";

function Achievements() {
  if (!achievementsData || achievementsData.length === 0) return null;

  return (
    <div
      id="achievements"
      className="relative z-50 py-16 lg:py-32 overflow-hidden"
    >
      {/* Decorative Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex justify-center mb-16 lg:mb-24">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-red-600"></span>
          <span className="bg-[#050505] border border-red-600/30 w-fit text-white p-3 px-8 text-2xl font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            Achievements
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-red-600"></span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {achievementsData.map((achievement, index) => (
            <SectionReveal
              key={index}
              direction="up"
              delay={index * 0.1}
            >
              <div className="group relative p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-red-600/30 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                  <Trophy className="text-red-500 w-7 h-7" />
                </div>
                
                <div className="flex flex-col gap-3 flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    {achievement.type && (
                      <span className="px-2 py-0.5 rounded-md bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {achievement.type}
                      </span>
                    )}
                    {achievement.type === "Research Paper" && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-black uppercase tracking-widest shadow-sm">
                        AI Research
                      </span>
                    )}
                    {achievement.year && (
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-auto">
                        {achievement.year}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-red-500 transition-all leading-tight break-words">
                      {achievement.title || achievement.name}
                    </h3>
                    {achievement.id && (
                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                        ID: {achievement.id}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium break-words">
                    {achievement.description}
                  </p>

                  {achievement.focus && (
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3 text-red-600/50" />
                      <span className="text-slate-400">Focus:</span> {achievement.focus}
                    </div>
                  )}

                  {achievement.link && (
                    <div className="mt-2">
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-600/20 group/btn"
                      >
                        {achievement.type === "Research Paper" ? "View Paper" : "View Details"}
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Decorative Background Icon */}
                <Trophy className="absolute -bottom-4 -right-4 w-24 h-24 text-red-500 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 -rotate-12 pointer-events-none" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
