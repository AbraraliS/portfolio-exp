import { Post } from "@/Types/types";

export const buildingCriza: Post = {
  slug: "building-criza-a-studio-website-you-can-check",
  title: "Building Criza: a studio website you can check for yourself",
  description:
    "How we built criza.dev, our software and AI studio's website, so visitors can test its claims: live performance numbers, no animation library, and nothing invented.",
  excerpt:
    "A new studio has no client logos to lean on. So we made the website itself the evidence, with claims anyone can test in their own browser in under a minute.",
  date: "2026-11-06",
  line: "web",
  stops: ["Discover", "Plan", "Design", "Build", "Test", "Deploy", "Maintain"],
  projects: ["criza"],
  skills: ["System Architecture", "React", "Deployment", "AI Integration"],
  blocks: [
    {
      t: "p",
      text: "[Criza](https://criza.dev) is the software and AI studio I run with my co-founder, AkbarAli N. We build websites, custom software, mobile apps and AI automation for growing businesses. There are two of us, and the people who scope a project are the same people who write the code and answer messages after launch.",
    },
    {
      t: "p",
      text: "A young studio has an obvious problem when it builds its own website: there isn't a wall of client logos to point at. We say so plainly on the site. The more interesting question was what to do instead.",
    },
    { t: "h2", text: "Make the website the evidence" },
    {
      t: "p",
      text: "Every agency says it builds fast, careful websites, and a visitor has no way to tell whether that's true. A studio's own site is different, because the visitor is already using the product. So [one page on our site](https://criza.dev/about/this-website) turns our claims into small tests, and each one takes seconds to try.",
    },
    {
      t: "table",
      head: ["The claim", "How you can check it"],
      rows: [
        [
          "Pages load quickly",
          "Read the live numbers measured in your own browser",
        ],
        [
          "Readable without JavaScript",
          "Turn JavaScript off and reload the page",
        ],
        [
          "No animation library",
          "Look through the scripts in your browser's dev tools",
        ],
        [
          "Works with a keyboard",
          "Press Tab and follow the visible focus ring",
        ],
        [
          "Analytics only with consent",
          "Decline the banner and watch the network panel",
        ],
      ],
    },
    {
      t: "p",
      text: "Writing the claims this way changes how you build. A claim that visitors can test has to stay true on every release, so it stops being marketing copy and becomes something closer to a requirement.",
    },
    { t: "h2", text: "Measure the visitor's own visit" },
    {
      t: "p",
      text: "The page's most direct test is a small panel of live figures: how long the page took to be ready, when the main content appeared, how much data was transferred and how many files were requested. They aren't lab scores or numbers from a marketing deck. They come from the browser of whoever is reading.",
    },
    {
      t: "p",
      text: "Browsers already record all of this through the Performance API, so a panel like this needs very little code.",
    },
    {
      t: "code",
      lang: "ts",
      file: "A sketch of the idea, not Criza's source",
      code: `const [page] = performance.getEntriesByType(
  "navigation",
) as PerformanceNavigationTiming[];
const resources = performance.getEntriesByType(
  "resource",
) as PerformanceResourceTiming[];

const report = {
  pageReadyMs: Math.round(page.domContentLoadedEventEnd),
  transferredBytes: resources.reduce(
    (total, file) => total + file.transferSize,
    page.transferSize,
  ),
  filesRequested: resources.length + 1,
};`,
    },
    {
      t: "p",
      text: "Showing real numbers carries some risk, because a slow connection will produce a slow figure. The page says that openly: results vary with your device, your connection and whether the page was already cached. On one fast connection I measured the page ready in 209 ms and the main content visible in 232 ms. Your numbers will be different, and that's the point of showing them.",
    },
    { t: "h2", text: "Keep the stack small" },
    {
      t: "p",
      text: "The site runs on React and TanStack Start with Tailwind CSS, is served from Cloudflare Workers, and sends email through Resend. That's a short list on purpose, and each item has a clear job.",
    },
    {
      t: "p",
      text: "Pages are rendered on the server, so the words, links and layout are all in the HTML before any JavaScript runs. With JavaScript switched off, the home page still shows its headline and all of its links. Animation is CSS plus a few small hooks, so visitors never download an animation library just to see something fade in. It's the same reasoning I wrote about in [what actually helped this portfolio's performance](/blog/performance-and-seo-for-a-nextjs-portfolio).",
    },
    { t: "h2", text: "Label everything, and invent nothing" },
    {
      t: "p",
      text: "Our rule for content is the strictest thing about the site: no fake clients, reviews or results. Sections stay hidden until there's something real to put in them, and concept work is labelled as concept work.",
    },
    {
      t: "p",
      text: "You can see this on the [portfolio page](https://criza.dev/portfolio). Each item says whether it's client work, a founder's own project or a concept, who built it, and how far along it is. Our client work for Amrat Interior, an Ahmedabad interior design studio, lists what was actually done: a corrected enquiry path, new pages, redesigned sections and on-page SEO. It also says that we don't publish traffic or ranking figures, and points to the live site so anyone can look.",
    },
    {
      t: "quote",
      text: "We have no client logos to show you yet, so here is something better than a logo: a site you can test right now.",
      cite: "criza.dev, This website",
    },
    {
      t: "p",
      text: "Most marketing advice would hide that. But a reader who catches one inflated claim stops believing the rest, and a small studio can't afford that. Plain honesty is also easier to maintain, because there's nothing to keep propping up.",
    },
    { t: "h2", text: "Write the process down as well" },
    {
      t: "p",
      text: "The same thinking applies to how we work with clients. The process is seven fixed stages, published on the site, so a client always knows which stage the project is in and what's waiting on them. Scope and price are agreed in writing before work starts.",
    },
    {
      t: "route",
      label: "The seven stages of a Criza project",
      stops: [
        "Discovery",
        "Planning",
        "UI/UX",
        "Development",
        "Testing",
        "Deployment",
        "Maintenance",
      ],
    },
    { t: "h2", text: "Give away something useful" },
    {
      t: "p",
      text: "Not everyone who visits is ready to talk. So instead of a newsletter form, the site offers two free tools with no sign-up: a [project brief builder](https://criza.dev/tools/project-brief) that turns a rough idea into a written brief, and a [website launch checklist](https://criza.dev/tools/website-launch-checklist) that saves progress in the browser. Both are useful whether or not you ever work with us. We also publish an [llms.txt](https://criza.dev/llms.txt) file with our key facts, so AI assistants have an accurate summary to work from.",
    },
    { t: "h2", text: "What carries over" },
    {
      t: "list",
      items: [
        "If you make a claim about quality, look for a way to let people test it.",
        "A claim someone can check becomes a requirement you have to keep meeting.",
        "Having little to show is easier to explain than an exaggeration is to take back.",
        "Hide a section until you have something real to put in it.",
        "Label work for what it is: client, personal or concept.",
      ],
    },
    {
      t: "p",
      text: "If you'd like to see all of this working, the [Criza case study](/projects/criza) has screens and details, or you can open [criza.dev](https://criza.dev) and start testing it yourself.",
    },
  ],
};
