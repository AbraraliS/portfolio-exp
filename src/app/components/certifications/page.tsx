"use client";
import { useState } from "react";
import { certificationsData } from "@/../utils/Data/certifications";
import { personalData } from "@/../utils/Data/PersonalData";
import { Award, ShieldCheck, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import SectionReveal from "../SectionReveal";

function Certifications() {
  const [showAll, setShowAll] = useState(false);
  
  if (!certificationsData || certificationsData.length === 0) return null;

  const displayedCerts = showAll ? certificationsData : certificationsData.slice(0, 4);

  return (
    <div
      id="certifications"
      className="relative z-50 py-16 lg:py-32 overflow-hidden"
    >
      {/* Decorative Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="flex justify-center mb-16 lg:mb-24">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-red-600"></span>
          <span className="bg-[#050505] border border-red-600/30 w-fit text-white p-3 px-8 text-2xl font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            Certifications
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-red-600"></span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {displayedCerts.map((cert, index) => (
            <SectionReveal
              key={index}
              direction="up"
              delay={index * 0.05}
            >
              <div className="group relative p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-red-600/30 transition-all duration-300 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <Award className="text-red-500 w-5 h-5" />
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <a
                    href={cert.link || personalData.certificationsDrive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-fit"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-red-500 hover:underline underline-offset-4 transition-all leading-tight">
                      {cert.name}
                    </h3>
                    <ExternalLink className="w-3 h-3 text-slate-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-2.5 h-2.5 text-red-900" />
                    Verified Credential
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {certificationsData.length > 4 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="group relative px-8 py-3 rounded-xl border border-red-600/30 bg-[#050505] text-white text-xs font-bold uppercase tracking-widest hover:border-red-600 transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-red-600/20"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  </>
                ) : (
                  <>
                    View List <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            )}

            <a
              href={personalData.certificationsDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-widest hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 flex items-center gap-2 shadow-xl"
            >
              View Certificates (Drive) <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certifications;
