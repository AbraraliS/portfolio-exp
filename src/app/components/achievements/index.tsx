"use client";
import { achievementsData } from "@/../utils/Data/achievements";
import { personalData } from "@/../utils/Data/PersonalData";
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
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {achievementsData.map((achievement, index) => (
            <SectionReveal
              key={index}
              direction="up"
              delay={index * 0.1}
            >
              <div className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-red-600/30 transition-all duration-300 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <Trophy className="text-red-500 w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <a
                    href={achievement.link || personalData.certificationsDrive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-fit"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-red-500 hover:underline underline-offset-4 transition-all leading-tight">
                      {achievement.name}
                    </h3>
                    <ExternalLink className="w-3 h-3 text-slate-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Star className="w-3 h-3 text-red-900" />
                    {achievement.description}
                  </div>
                </div>

                {/* Decorative Background Icon */}
                <Trophy className="absolute -bottom-2 -right-2 w-20 h-20 text-red-500 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 -rotate-12" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
