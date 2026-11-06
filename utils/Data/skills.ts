export const skillGroups = [
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "Java", "Python"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    name: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "REST API",
      "API Design",
      "Schema Design",
    ],
  },
  {
    name: "Mobile",
    skills: ["React Native", "Expo"],
  },
  {
    name: "AI and automation",
    skills: [
      "AI Integration",
      "Prompt Engineering",
      "LLM APIs",
      "Automation",
      "Workflow Systems",
    ],
  },
  {
    name: "System design",
    skills: [
      "System Architecture",
      "Microservices",
      "Scalable Systems",
      "Event-Driven Design",
    ],
  },
  {
    name: "DevOps",
    skills: ["Docker", "Vercel", "Deployment", "CI/CD", "Linux"],
  },
  {
    name: "Tools",
    skills: ["Git", "Postman", "Prisma", "n8n"],
  },
];

export const skillsData = skillGroups.flatMap((group) => group.skills);
