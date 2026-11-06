import { Post } from "@/Types/types";

export const responsive: Post = {
  slug: "responsive-design-beyond-breakpoints",
  title: "Responsive design beyond breakpoints: how this site adapts",
  description:
    "Container queries, fluid type, source-order changes and touch-first interaction, with working code from this portfolio and how to test for overflow automatically.",
  excerpt:
    "A phone is not a small laptop. Using this site as the example: when to query the container instead of the screen, and what replaces hover when nobody is hovering.",
  date: "2026-11-06",
  line: "web",
  stops: ["Content", "Container", "Viewport", "Touch", "Test"],
  projects: [],
  skills: ["React", "Next.js", "Tailwind CSS"],
  blocks: [
    {
      t: "p",
      text: "Modern frontend frameworks make it easy to ship components, but they do not decide how those components should adapt. That is still a design decision. This article uses the site you are reading as a working example, since I can show the real code and what it does at each size.",
    },
    { t: "h2", text: "Start with type that scales by itself" },
    {
      t: "p",
      text: "Many breakpoints exist only to change font sizes. `clamp()` removes most of them, setting a minimum, a preferred fluid value and a maximum in a single line.",
    },
    {
      t: "code",
      lang: "css",
      file: "globals.css",
      code: `.stop-title {
  font-size: clamp(64px, 10vw, 136px);
}

:root {
  --gutter: clamp(16px, 4vw, 56px);
}`,
    },
    {
      t: "p",
      text: "Spacing works the same way. Because the page gutter is one fluid token, every section keeps a consistent edge at every width without any per-breakpoint overrides.",
    },
    { t: "h2", text: "Ask the container, not the screen" },
    {
      t: "p",
      text: "Media queries answer the wrong question for reusable components. The route diagrams on this site appear in a narrow project card and in a wide article column, sometimes on the same screen size. What matters is the space the diagram actually has.",
    },
    {
      t: "code",
      lang: "css",
      file: "globals.css",
      code: `.route-diagram {
  container-type: inline-size;
}

/* Vertical by default. Horizontal once there's room for labels. */
@container (min-width: 520px) {
  .route-diagram ol {
    display: flex;
  }
}`,
    },
    {
      t: "p",
      text: "Here is the result, and it is the same component on every page. Resize the window and it changes layout when its own width crosses the threshold, wherever it has been placed.",
    },
    {
      t: "route",
      label: "An example route diagram",
      stops: ["Content", "Container", "Viewport", "Touch", "Test"],
    },
    { t: "h2", text: "Change the order, not just the size" },
    {
      t: "p",
      text: "The system map is this site's most distinctive element. On a desktop it sits beside the introduction. Stacked naively on a phone, all the supporting text would come first and the map would land below the fold. So on small screens the order changes.",
    },
    {
      t: "code",
      lang: "css",
      file: "motion.css",
      code: `@media (max-width: 1023px) {
  .hero-copy { display: contents; }
  .hero-role { order: 2; }
  .hero-actions { order: 3; }
  .map { order: 4; }
  .hero-skills { order: 5; }
}`,
    },
    {
      t: "p",
      text: "`display: contents` lets the children of `.hero-copy` join the parent grid so they can be reordered individually. Use this carefully. Visual order and DOM order now differ, so check that keyboard focus still moves sensibly. Here, the only focusable items that move are the buttons and the map controls, and they still come in a reasonable order.",
    },
    { t: "h2", text: "Replace hover, do not just remove it" },
    {
      t: "p",
      text: "On a desktop, each project card's line runs along its edge when you point at it. A phone has no hover, and if you do nothing, all that polish simply disappears. That is often why a mobile site feels static compared with its desktop version.",
    },
    {
      t: "p",
      text: "The fix is to find the touch equivalent of the same idea. On touch screens, the line runs as the card scrolls into view, tied directly to the scroll position. The feedback stays, with a different trigger.",
    },
    {
      t: "code",
      lang: "css",
      file: "motion.css",
      code: `@media (hover: none) {
  @supports (animation-timeline: view()) {
    .card-body::before {
      animation: line-run linear both;
      animation-timeline: view();
      animation-range: entry 30% cover 55%;
    }
  }
}`,
    },
    {
      t: "p",
      text: "Scroll-driven animation runs without a scroll listener and animates only `transform`, so it stays smooth on modest phones. Browsers without support get the static version, which is still complete. Other touch adaptations follow the same reasoning:",
    },
    {
      t: "list",
      items: [
        "Primary navigation moves to a bottom dock, within reach of a thumb.",
        "Featured projects become a swipeable rail, with stations showing your position.",
        "Long card details collapse behind a button, so a card stays scannable.",
        "Buttons and navigation targets are at least 44 pixels tall, and pressed states respond immediately.",
      ],
    },
    { t: "h2", text: "Respect people who ask for less motion" },
    {
      t: "p",
      text: "All of the motion here sits behind `prefers-reduced-motion: no-preference`, so it is opt-in rather than something to switch off. Content that reveals on scroll is only hidden if JavaScript has confirmed it can reveal it again, using a class added by a small inline script. An earlier version of this portfolio had a bug where whole sections could stay invisible if a scroll animation misfired. That cannot happen with this approach.",
    },
    { t: "h2", text: "Test for overflow instead of looking for it" },
    {
      t: "p",
      text: "Horizontal overflow is the classic responsive bug, and it is tedious to catch by eye across many widths. It is easy to check automatically. This is the core of the check I run with Playwright at 320, 390, 768, 1024, 1440 and 1920 pixels.",
    },
    {
      t: "code",
      lang: "js",
      file: "Overflow check",
      code: `const overflow = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  viewport: document.documentElement.clientWidth,
}));

expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.viewport);`,
    },
    {
      t: "note",
      text: "Pages using `overflow-x: clip` will pass this check even if something sticks out. For a stricter test, walk every element and compare its right edge to the viewport, skipping anything inside an intentional scroll container such as a carousel.",
    },
    { t: "h2", text: "What to take from this" },
    {
      t: "p",
      text: "Good responsive design is a set of content decisions more than a set of breakpoints. Decide what matters first on a small screen, let components respond to the space they are given, and give touch users their own version of every interaction. Then automate the checks, so a later change cannot quietly undo the work.",
    },
  ],
};
