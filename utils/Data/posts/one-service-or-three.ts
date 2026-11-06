import { Post } from "@/Types/types";

export const oneServiceOrThree: Post = {
  slug: "one-service-or-three-texora-and-buysmart-architecture",
  title: "One service or three? Comparing Texora and BuySmart AI",
  description:
    "Two AI products with very different architectures: a single Next.js app and a three-service system. What drove each choice, and what each one costs.",
  excerpt:
    "Both products call AI models and serve a React frontend, yet one is a single Next.js app and the other is three services. The difference comes from constraints, not fashion.",
  date: "2026-11-06",
  line: "web",
  stops: ["Constraints", "Boundaries", "Trade-offs", "Decision"],
  projects: ["texora-marketplace", "buysmart-ai"],
  skills: ["Microservices", "Next.js", "Spring Boot", "System Architecture"],
  blocks: [
    {
      t: "p",
      text: "Discussions about modern web architecture often turn into a choice of camp: monolith or microservices. Two of my projects are a more useful comparison, because they look similar from the outside. [Texora](/projects/texora-marketplace) and [BuySmart AI](/projects/buysmart-ai) both have a React frontend, both authenticate users, and both call AI models. Their architectures could hardly be more different.",
    },
    { t: "h2", text: "Texora: one application, on purpose" },
    {
      t: "p",
      text: "Texora is a B2B textile marketplace built as a hackathon MVP. Its backend is Next.js Route Handlers and nothing else, with MongoDB Atlas for data and Cloudinary for images. The scope document is blunt about this:",
    },
    {
      t: "quote",
      text: "Next.js Route Handlers as the only backend.",
      cite: "Texora, docs/02_SCOPE.md",
    },
    {
      t: "p",
      text: "The same document lists what must never be built, and that list includes microservices, Docker, Redis, background workers and WebSockets. That sounds restrictive, but it did real work. A hackathon rewards a complete, working product, and every extra service is another thing to deploy, connect and debug before anyone sees a feature.",
    },
    {
      t: "p",
      text: "A single application also suits what Texora's AI features need. The sourcing assistant, natural-language search and product comparison call hosted model APIs. Sending an HTTP request does not need its own runtime, so a separate AI service would add moving parts without adding capability.",
    },
    {
      t: "route",
      label: "Request flow in Texora",
      stops: ["User", "Next.js app", "Auth, DB, AI services", "Rendered UI"],
    },
    { t: "h2", text: "BuySmart AI: three services, also on purpose" },
    {
      t: "p",
      text: "BuySmart analyses products with real-time data and returns a Buy Score with pros and cons. It splits into a React frontend, a Spring Boot backend for business logic and data, and a Python FastAPI service for the AI work, all defined in one `docker-compose.yml`.",
    },
    {
      t: "route",
      label: "BuySmart AI pipeline",
      stops: ["Search", "Fetch", "Analyze", "Recommend"],
    },
    {
      t: "p",
      text: "The reasoning is written down in the project README, trade-off included:",
    },
    {
      t: "quote",
      text: "The AI logic is kept in a Python FastAPI service rather than integrating Java-based AI SDKs. Trade-off: Increases deployment complexity but allows the use of Python's superior AI/ML ecosystem.",
      cite: "BuySmart AI, README",
    },
    {
      t: "p",
      text: "There is a real boundary here, because the language ecosystems differ. The AI service is stateless: it receives product JSON and returns a structured evaluation. It knows nothing about users or wishlists, and the Java backend knows nothing about prompts. Either side can change without the other noticing, as long as the contract holds.",
    },
    { t: "h2", text: "The questions that actually decided it" },
    {
      t: "table",
      head: ["Question", "Texora", "BuySmart AI"],
      rows: [
        [
          "How long do we have?",
          "A hackathon deadline",
          "Time to run several services",
        ],
        [
          "Does any part need another runtime?",
          "No, hosted APIs are called from Node",
          "Yes, AI work lives in Python",
        ],
        [
          "What should fail independently?",
          "Nothing needs to",
          "AI outages must not take the app down",
        ],
        [
          "Who operates it?",
          "A platform deployment",
          "Docker Compose across services",
        ],
      ],
    },
    {
      t: "p",
      text: "The third row is the most underrated. Separating a service only pays off if the rest of the system can survive without it. BuySmart earns this: an `ai.enabled` property lets the backend fall back to local parsing with Jsoup when the AI service is down or rate limited. The insights are less intelligent, but the app keeps working. Without that fallback, the split would give you two services that fail together, which is worse than one.",
    },
    { t: "h2", text: "Costs are easy to under-count" },
    {
      t: "p",
      text: "A service boundary turns a function call into a network request. That brings timeouts, retries, contract versions, and more places to look when something breaks. It is why the BuySmart repository has separate documents for Docker setup, environment setup and running locally, and why Texora can get by with far less.",
    },
    {
      t: "p",
      text: "The single application has costs too. Everything scales and deploys together, and a slow route shares resources with everything else. If Texora ever needed long-running local inference, that would be a reason to split it, and the boundary would be obvious by then.",
    },
    { t: "h2", text: "Written scope is an architecture tool" },
    {
      t: "p",
      text: "The most reusable idea from Texora is not technical. An explicit list of things that must never be built stops architecture from growing by accident. It is easy to add Redis because it might help one day. It is harder when a document says you decided not to, and changing the scope has a process.",
    },
    {
      t: "p",
      text: "BuySmart's version of the same discipline is recording each design decision with its trade-off. When a decision and its cost sit next to each other, you can revisit it properly later. The README also lists moving the product cache to Redis as a future improvement, tied to a known issue with stale prices, so the need comes before the tool.",
    },
    { t: "h2", text: "A practical default" },
    {
      t: "list",
      ordered: true,
      items: [
        "Start with one deployable application.",
        "Keep module boundaries clean inside it, so a later split is mostly moving code.",
        "Split only for a specific reason: another runtime, independent failure, or very different scaling.",
        "If you split, build the fallback at the same time. It is what makes the boundary worth having.",
      ],
    },
    {
      t: "p",
      text: "Neither project's architecture is the correct one. Each is a reasonable answer to its own constraints, and that is the only standard that holds up.",
    },
  ],
};
