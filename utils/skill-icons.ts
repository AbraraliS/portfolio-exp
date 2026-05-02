import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiFigma,
  SiBootstrap,
  SiMui,
  SiCanva,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiPython,
  SiFastapi,
  SiOpencv,
  SiPytorch,
  SiDocker,
  SiPostgresql,
  SiSupabase,
  SiChartdotjs,
  SiExpress,
  SiCloudflare,
  SiRedis,
  SiWebrtc,
  SiTelegram,
  SiRaspberrypi,
  SiGithub,
  SiAmazonwebservices,
} from "react-icons/si";
import { FaJava, FaServer, FaDatabase, FaBrain, FaCube, FaLock, FaCloud } from "react-icons/fa";
import { IconType } from "react-icons";

export const getSkillIcon = (skill: string): IconType => {
  const skillLower = skill.toLowerCase().trim();

  switch (skillLower) {
    // Web Core
    case "html":
      return SiHtml5;
    case "css":
      return SiCss3;
    case "javascript":
    case "js":
      return SiJavascript;
    case "typescript":
    case "ts":
      return SiTypescript;

    // Frontend
    case "react":
      return SiReact;
    case "next js":
    case "nextjs":
    case "next.js":
      return SiNextdotjs;
    case "tailwind":
    case "tailwindcss":
    case "tailwind css":
      return SiTailwindcss;
    case "bootstrap":
      return SiBootstrap;
    case "materialui":
    case "mui":
      return SiMui;

    // Backend & Runtimes
    case "node js":
    case "nodejs":
    case "node.js":
      return SiNodedotjs;
    case "fastapi":
      return SiFastapi;
    case "express":
    case "express.js":
      return SiExpress;
    case "java":
      return FaJava;
    case "python":
      return SiPython;
    case "rest apis":
    case "rest api":
      return FaServer;

    // Databases
    case "mongodb":
      return SiMongodb;
    case "mysql":
      return SiMysql;
    case "postgresql":
    case "postgres":
      return SiPostgresql;
    case "firebase":
      return SiFirebase;
    case "supabase":
      return SiSupabase;
    case "upstash redis":
    case "redis":
      return SiRedis;

    // AI / ML
    case "pytorch":
      return SiPytorch;
    case "whisper":
    case "transformers":
    case "openrouter (claude 3.5 sonnet)":
    case "llm agents":
      return FaBrain;
    case "opencv":
      return SiOpencv;
    case "mediapipe":
      return SiOpencv; // Closest visual match

    // DevOps & Infra
    case "docker":
      return SiDocker;
    case "git":
      return SiGit;
    case "github api (octokit)":
    case "github api":
      return SiGithub;
    case "cloudflare workers":
    case "cloudflare":
      return SiCloudflare;
    case "cloud storage":
      return FaCloud;
    case "cloud (aws/gcp)":
    case "aws":
      return SiAmazonwebservices;

    // Specialised
    case "chart.js":
      return SiChartdotjs;
    case "webrtc":
      return SiWebrtc;
    case "telegram bot api":
      return SiTelegram;
    case "raspberry pi":
      return SiRaspberrypi;
    case "windows":
    case "browser automation":
    case "queue workers":
      return FaCube;
    case "indexeddb":
    case "workbox":
    case "bullmq":
    case "auth.js (nextauth)":
    case "jwt/auth":
      return FaLock;
    case "react native (expo)":
    case "react native":
      return SiReact;

    // Design
    case "figma":
      return SiFigma;
    case "canva":
      return SiCanva;
    case "illustrator":
      return SiAdobeillustrator;
    case "photoshop":
      return SiAdobephotoshop;

    // Fallback
    default:
      return FaDatabase;
  }
};

export const getSkillColor = (skill: string): string => {
  const skillLower = skill.toLowerCase().trim();
  switch (skillLower) {
    case "html":
      return "#e34f26";
    case "css":
      return "#1572b6";
    case "javascript":
    case "js":
      return "#f7df1e";
    case "typescript":
    case "ts":
      return "#3178c6";
    case "react":
    case "react native (expo)":
    case "react native":
      return "#61dafb";
    case "next js":
    case "nextjs":
    case "next.js":
      return "#ffffff";
    case "tailwind":
    case "tailwindcss":
    case "tailwind css":
      return "#06b6d4";
    case "node js":
    case "nodejs":
    case "node.js":
      return "#339933";
    case "fastapi":
      return "#009688";
    case "express":
    case "express.js":
      return "#ffffff";
    case "java":
      return "#f89820";
    case "python":
      return "#3776ab";
    case "pytorch":
      return "#ee4c2c";
    case "opencv":
      return "#5c3ee8";
    case "mediapipe":
      return "#5c3ee8";
    case "mongodb":
      return "#47a248";
    case "mysql":
      return "#4479a1";
    case "postgresql":
    case "postgres":
      return "#336791";
    case "firebase":
      return "#ffca28";
    case "supabase":
      return "#3ecf8e";
    case "upstash redis":
    case "redis":
      return "#dc382d";
    case "docker":
      return "#2496ed";
    case "git":
      return "#f05032";
    case "github api (octokit)":
    case "github api":
      return "#ffffff";
    case "cloudflare workers":
    case "cloudflare":
      return "#f38020";
    case "chart.js":
      return "#ff6384";
    case "webrtc":
      return "#ef4444";
    case "telegram bot api":
      return "#26a5e4";
    case "raspberry pi":
      return "#a22846";
    case "figma":
      return "#f24e1e";
    default:
      return "#ef4444";
  }
};
