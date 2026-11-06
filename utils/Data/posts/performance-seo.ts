import { Post } from "@/Types/types";

export const performanceSeo: Post = {
  slug: "performance-and-seo-for-a-nextjs-portfolio",
  title: "Performance and SEO for a Next.js site: what actually helped",
  description:
    "Static generation, removing dependencies, correct image priorities, click-to-load video and structured data, from optimising this portfolio, including the mistakes.",
  excerpt:
    "Optimising this site came down to sending less and telling the browser the truth about what matters. Including a preload that made things worse, and a test run that was measuring the wrong thing.",
  date: "2026-11-06",
  line: "web",
  stops: ["Remove", "Prerender", "Prioritise", "Defer", "Describe", "Verify"],
  projects: [],
  skills: ["Next.js", "React", "Deployment"],
  blocks: [
    {
      t: "p",
      text: "Performance advice often turns into a list of tricks. Most of what helped on this site was simpler: send less code, build pages ahead of time, and be accurate about which resources matter. Here is what I changed, why, and what I got wrong along the way.",
    },
    { t: "h2", text: "Start by removing things" },
    {
      t: "p",
      text: "The fastest code is code that is never sent. An earlier version of this portfolio had 28 runtime dependencies, including an animation library, two Lottie packages, a tilt effect, a carousel, a marquee, scroll helpers and several email and captcha clients it no longer used. The redesign needs seven.",
    },
    {
      t: "p",
      text: "Modern CSS made much of that possible. Filter transitions use the View Transitions API, scroll progress uses scroll-driven animations, and reveals use a small `IntersectionObserver` wrapper of about 30 lines. Each of these is a capability the browser already ships, so it adds nothing to the bundle.",
    },
    { t: "h2", text: "Build pages before anyone asks for them" },
    {
      t: "p",
      text: "Nearly everything here can be generated at build time. Dynamic routes only need to declare their paths.",
    },
    {
      t: "code",
      lang: "ts",
      file: "src/app/projects/[id]/page.tsx",
      code: `export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: String(project.id) }));
}`,
    },
    {
      t: "p",
      text: "`dynamicParams = false` means an unknown project returns a 404 immediately instead of attempting to render. The only server-rendered route left is the contact form's API. Articles are also rendered at build time, and that includes the syntax highlighting in the code blocks, so it adds no client JavaScript.",
    },
    { t: "h2", text: "Be honest about image priority" },
    {
      t: "p",
      text: "This one was my own mistake. The first project card used `priority` on its image, because the first card felt important. On a phone, that card is well below the fold. So the browser was told to preload an image nobody could see yet, and that competed with the hero text for the first paint.",
    },
    {
      t: "p",
      text: "`priority` should only go on the element that is actually the largest paint. On this site's home page that is the hero text, which needs no image at all, so the right number of preloaded images is zero. On a project page the lead screenshot is near the top, so it does get the flag.",
    },
    {
      t: "p",
      text: "`sizes` deserves equal attention, because it decides which file the browser downloads. Without it, a `fill` image can fetch a version as wide as the viewport for a slot half that size.",
    },
    {
      t: "code",
      lang: "tsx",
      file: "ProjectCard.tsx",
      code: `<Image
  src={project.thumbnail}
  alt={\`\${name} screenshot\`}
  fill
  sizes="(min-width: 768px) 45vw, 86vw"
/>`,
    },
    { t: "h2", text: "Load heavy embeds on request" },
    {
      t: "p",
      text: "A YouTube iframe brings a lot of JavaScript with it, whether or not anyone presses play. Project pages show a thumbnail and a button instead, and only create the iframe when asked. It uses the `youtube-nocookie` domain, which also means no player loads for people who never watch.",
    },
    {
      t: "code",
      lang: "tsx",
      file: "VideoFacade.tsx",
      code: `{playing ? (
  <iframe src={\`https://www.youtube-nocookie.com/embed/\${videoId}?autoplay=1\`} />
) : (
  <button onClick={() => setPlaying(true)}>Play demo</button>
)}`,
    },
    { t: "h2", text: "Animate only what the compositor can handle" },
    {
      t: "p",
      text: "Animating `width`, `top` or `height` forces layout work on every frame, and this is where cheap phones struggle. Animating `transform` and `opacity` can be handled by the compositor. So when a project card's line grows, it is not animating `width`. It is a full-width element scaled from a small fraction to 1.",
    },
    {
      t: "code",
      lang: "css",
      file: "motion.css",
      code: `.card-body::before {
  width: 100%;
  transform: scaleX(0.14);
  transform-origin: left;
  transition: transform 0.55s var(--ease);
}

.card:hover .card-body::before {
  transform: scaleX(1);
}`,
    },
    {
      t: "p",
      text: "Avoiding layout shift comes from the same discipline. Images declare their aspect ratio before they load, fonts are self-hosted through `next/font` with fallback metrics, and nothing is inserted above existing content after the first paint.",
    },
    { t: "h2", text: "Describe every page properly" },
    {
      t: "p",
      text: "For SEO, the basics did most of the work. Each page has its own title, description and canonical URL, and pages generate this from their data, so a new project or article gets it automatically. The old social preview was actually broken, pointing to an image that did not exist and a domain that returned a 404. It is easy to miss, because nothing on your own screen looks wrong.",
    },
    {
      t: "p",
      text: "Structured data tells search engines what a page is. Articles here publish both an `Article` and a `BreadcrumbList`, and their values come from the same source as the visible page, so they cannot drift apart.",
    },
    {
      t: "code",
      lang: "ts",
      file: "src/app/blog/[slug]/page.tsx",
      code: `const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  author: { "@type": "Person", name: personalData.name, url: SITE_URL },
};`,
    },
    {
      t: "p",
      text: "The sitemap is generated from the same data as well. Add an article and it appears there, in the blog listing and in the footer, with no extra step.",
    },
    { t: "h2", text: "Verify the thing you think you are testing" },
    {
      t: "p",
      text: "My favourite lesson from this work was an accident. During one test run the scores fell, a page's accessibility dropped sharply, and a preload I had already removed was still there. The code was fine. An old server process was still holding the port and serving a mix of old HTML and missing assets, because my cleanup command had missed it.",
    },
    {
      t: "p",
      text: "If I had believed those numbers, I would have spent hours fixing problems that did not exist. If they had been good, I might have shipped without testing my real build at all. Now the routine is strict: stop everything, confirm the port is free, do a clean build, then check that the server is serving what you expect before measuring anything.",
    },
    { t: "h2", text: "Measure, and read numbers carefully" },
    {
      t: "p",
      text: "Lab tools like Lighthouse are useful for catching regressions, but mobile scores use simulated throttling. Treat them as a comparison between builds rather than a promise about any real visitor. Real-user data is the measure that counts once a site has traffic.",
    },
    {
      t: "list",
      ordered: true,
      items: [
        "Remove what you can before you optimise what remains.",
        "Prerender everything that does not need a request to render.",
        "Mark only the true largest element as high priority.",
        "Load expensive embeds when someone asks for them.",
        "Animate `transform` and `opacity`.",
        "Generate metadata from your data so that it cannot go stale.",
        "Make sure your measurements are measuring the right build.",
      ],
    },
  ],
};
