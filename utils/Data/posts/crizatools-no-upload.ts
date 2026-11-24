import { Post } from "@/Types/types";

export const crizatoolsNoUpload: Post = {
  slug: "crizatools-browser-tools-that-never-upload-your-files",
  title: "CrizaTools: 67 free tools that never upload your files",
  description:
    "How CrizaTools runs PDF, image, invoice and QR tools inside the browser with Astro and small Preact islands, so files stay on the visitor's device and pages load fast.",
  excerpt:
    "Most free online tools ask you to upload a file to a stranger's server. CrizaTools does the work in your own browser instead, and the pages stay fast.",
  date: "2026-11-23",
  line: "web",
  stops: ["Research", "Design", "Build", "Test", "Deploy", "Grow"],
  projects: ["crizatools"],
  skills: ["Astro", "Performance", "Privacy", "SEO"],
  blocks: [
    {
      t: "p",
      text: "Turning photos into a PDF or shrinking an image should not mean sending your documents to an unknown server. [CrizaTools](https://tools.criza.dev) does that work inside your own browser, so the file never leaves your phone or computer.",
    },
    { t: "h2", text: "The work happens on your device" },
    {
      t: "p",
      text: "Each tool reads the file you pick, processes it in the page and hands the result back as a download. There is no upload step to wait for, nothing to delete afterwards, and no sign up. The same rule covers the GST invoice generator and the Google review QR card: what you type stays in the page.",
    },
    {
      t: "route",
      stops: ["Pick a file", "Process in the page", "Download the result"],
      label: "A tool run, with no server in the middle",
    },
    { t: "h2", text: "Static pages, small islands" },
    {
      t: "p",
      text: "The site is built with Astro. Every page is pre-built HTML served from Cloudflare, and only the tool itself is an interactive Preact island. The guide, the questions and the links around it are plain HTML, so the page is readable at once and little JavaScript loads.",
    },
    {
      t: "table",
      head: ["Part", "Built with"],
      rows: [
        ["Pages and guides", "Astro, pre-built"],
        ["Each tool", "A Preact island"],
        ["Styling", "Tailwind CSS"],
        ["Hosting", "Cloudflare"],
      ],
    },
    { t: "h2", text: "Made to be found" },
    {
      t: "list",
      items: [
        "**One clear page per task**, named the way people search for it.",
        "**A guide for each tool** that answers the questions people actually ask.",
        "**Installable**, so the tools work offline like an app.",
        "**Consent first**: analytics and ads stay off until the visitor agrees.",
      ],
    },
    {
      t: "p",
      text: "There are 67 tools today across PDF and image, calculators, QR codes and business. [Try them on tools.criza.dev](https://tools.criza.dev) or read the [case study](/projects/crizatools).",
    },
  ],
};
