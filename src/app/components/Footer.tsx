// src/app/components/Footer.tsx
"use client";
import { personalData } from "@/../utils/Data/PersonalData";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaGitlab,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/5 text-gray-200">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-24 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-6">
          <Link href="/" className="w-fit">
            <Image
              src="/logo.png"
              alt="Abrarali Sunasara Logo"
              width={160}
              height={160}
              className="brightness-125"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Full Stack & Systems Engineer dedicated to designing scalable
            architectures, APIs, and AI-driven workflows.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-auto">
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-50">
            Navigation
          </h3>
          <ul className="space-y-4">
            {[
              { label: "About", to: "about" },
              { label: "Experience", to: "experience" },
              { label: "Education", to: "education" },
              { label: "Skills", to: "skills" },
              { label: "Projects", to: "projects" },
              { label: "Certifications", to: "certifications" },
              { label: "Contact", to: "contact" },
            ].map((item) => (
              <li key={item.to}>
                <ScrollLink
                  to={item.to}
                  smooth
                  duration={500}
                  className="text-gray-400 hover:text-red-500 transition-all cursor-pointer font-medium"
                >
                  {item.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-auto">
          <div className="w-full">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-50">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalData.email}`}
                className="text-gray-400 hover:text-red-500 transition-all font-medium break-all"
              >
                {personalData.email}
              </a>
              <a
                href={`tel:${personalData.phone}`}
                className="text-gray-400 hover:text-red-500 transition-all font-medium break-all"
              >
                {personalData.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {personalData.github && (
              <Link
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
              >
                <FaGithub size={20} />
              </Link>
            )}
            {personalData.linkedIn && (
              <Link
                href={personalData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
              >
                <FaLinkedin size={20} />
              </Link>
            )}
            {personalData.youtube && (
              <Link
                href={personalData.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
              >
                <FaYoutube size={20} />
              </Link>
            )}
            {personalData.Instagram && (
              <Link
                href={personalData.Instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
              >
                <FaInstagram size={20} />
              </Link>
            )}
            {personalData.gitlab && (
              <Link
                href={personalData.gitlab as string}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
              >
                <FaGitlab size={20} />
              </Link>
            )}
            {personalData.twitter && (
              <Link
                href={personalData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
              >
                <FaXTwitter size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4 text-gray-500 text-sm">
        <p>&copy; 2026 Abrarali Sunasara. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
