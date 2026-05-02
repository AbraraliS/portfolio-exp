export const projectsData = [
  {
    id: 1,
    name: "TIPS — Temporal Interview Profiling System",
    shortTitle: "TIPS",
    description: "A multimodal AI system that analyzes recorded video interviews using audio, video, and LLM-based semantic evaluation to generate objective, time-evolving candidate assessments.",
    featured: true,
    tools: ["Python", "FastAPI", "WebRTC", "OpenCV", "MediaPipe", "Whisper", "PyTorch", "Transformers", "Chart.js"],
    role: "System Architecture",
    code: "https://github.com/AbraraliS/TIPS-LLM",
    demo: "",
    date: "2026",
    status: "Completed",
    isMain: true,
    priority: 1,
    category: "AI / System Design",
    type: "Advanced AI System",
    images: [
      "/projects/tips/tips-overview.png",
      "/projects/tips/tips-dashboard.png",
      "/projects/tips/tips-timeline.png",
      "/projects/tips/tips-analysis.png",
      "/projects/tips/tips-qa.png",
      "/projects/tips/tips-architecture.png"
    ],
    thumbnail: "/projects/tips/tips-overview.png",
    videos: [""],
    highlights: [
      "Reduces hiring subjectivity using data-driven evaluation",
      "Supports scalable automated interview analysis",
      "Tracks candidate performance evolution over time"
    ],
    features: [
      "Multimodal analysis (audio + video + text)",
      "LLM-based evaluation",
      "Time-based scoring",
      "Automated Q&A pairing",
      "Behavioral metrics tracking"
    ],
    system_architecture: {
      type: "Multimodal AI Pipeline",
      components: [
        "Interview UI (WebRTC)",
        "Backend Analysis Pipeline (6 stages)",
        "Dashboard (Visual Analytics)"
      ],
      flow: "WebRTC Capture → 6-Stage Pipeline → LLM Semantic Scoring → Visual Analytics Dashboard"
    },
    pipeline: [
      "Timebase (Synchronization)",
      "Extraction (Multimodal Features)",
      "Temporal Segmentation",
      "Behaviour Analysis",
      "Semantic Scoring (LLM)",
      "Aggregation (Final Verdict)"
    ]
  },
  {
    id: 2,
    name: "OpenClaw Orchestrator",
    shortTitle: "OpenClaw",
    description: "A multi-agent orchestration system where a central commander agent coordinates specialized sub-agents (researcher, analyzer, coder, assistant) to execute complex tasks autonomously, including web interaction and real-world action simulation.",
    category: "AI / Systems / Automation",
    type: "AI System",
    role: "Full Stack AI Systems Architect",
    featured: true,
    date: "2026",
    tools: [
      "Python",
      "Docker",
      "Telegram Bot API",
      "LLM Agents",
      "Browser Automation",
      "Raspberry Pi",
      "Windows"
    ],
    features: [
      "Commander–subagent architecture for distributed task execution",
      "Specialized agents (researcher, analyzer, coder, assistant) working collaboratively",
      "Autonomous workflow execution with task delegation and result aggregation",
      "Browser interaction capabilities including search and simulated transactions",
      "Telegram-based control interface for remote task triggering",
      "Lightweight execution using PicoClaw (~10MB RAM footprint)",
      "Cross-platform deployment (Raspberry Pi + low-end systems + Windows)",
      "Containerized architecture using Docker for portability"
    ],
    highlights: [
      "Designed scalable agent orchestration model for automation workflows",
      "Optimized for low-resource environments without sacrificing capability",
      "Bridges AI agents with real-world task execution (web + system actions)"
    ],
    system_architecture: {
      type: "Commander–Subagent Orchestration",
      components: [
        "Commander Agent (Orchestration)",
        "Researcher Agent (Data Gathering)",
        "Analyzer Agent (Reasoning)",
        "Coder Agent (Execution)",
        "Assistant Agent (Coordination)"
      ],
      flow: "Input → Task Decomposition → Delegation → Parallel Execution → Result Aggregation"
    },
    deployment: {
      platforms: ["Raspberry Pi", "Windows", "Linux (Docker)"],
      highlights: [
        "Containerized via Docker",
        "PicoClaw variant for constrained hardware",
        "Cross-platform compatibility"
      ]
    },
    capabilities: [
      "Autonomous Web Browsing",
      "Real-world Action Simulation",
      "Remote Telegram Control",
      "Distributed Task Processing"
    ],
    status: "Completed",
    isMain: false,
    priority: 4
  },
  {
    id: 3,
    name: "GitStore — GitHub-Based Distributed File System",
    shortTitle: "GitStore",
    description: "A distributed file storage system that transforms GitHub repositories into a personal cloud filesystem using an HDFS-inspired architecture with encryption, deduplication, and multi-layer caching.",
    category: "Systems / Distributed / Full Stack",
    type: "Distributed System",
    role: "Full Stack Systems Engineer",
    featured: true,
    date: "2026",
    tools: [
      "Next.js",
      "TypeScript",
      "GitHub API (Octokit)",
      "Auth.js (NextAuth)",
      "Cloudflare Workers",
      "IndexedDB",
      "Workbox",
      "Upstash Redis",
      "BullMQ",
      "React Native (Expo)"
    ],
    images: [
      "/projects/gitstore/gitstore-main.png"
    ],
    thumbnail: "/projects/gitstore/gitstore-main.png",
    features: [
      "HDFS-inspired architecture using GitHub repos as data nodes",
      "Chunked file uploads with parallel processing and deduplication (SHA-256)",
      "Client-side AES-256-GCM encryption for secure storage",
      "5-layer caching system (memory → IndexedDB → service worker → CDN → GitHub API)",
      "O(1) instant search using inverted index",
      "Fault-tolerant index replication (primary + secondary repos)",
      "Cloudflare CDN proxy for optimized file delivery",
      "Cross-platform support including web and mobile app"
    ],
    highlights: [
      "Replaces traditional cloud storage with GitHub-based infrastructure",
      "Implements distributed system concepts in a real-world application",
      "Optimized for performance using multi-layer caching and edge delivery"
    ],
    system_architecture: {
      type: "Distributed Node-Based Storage",
      components: [
        "NameNode (Index Repository)",
        "DataNodes (GitHub Repositories)",
        "Client (Web/Mobile App)",
        "Edge Proxy (Cloudflare Workers)"
      ],
      flow: "Client → AES Encryption → Chunking → Parallel Upload → DataNodes → NameNode Index Update"
    },
    core_systems: {
      upload_pipeline: "Hashing → Chunking → Encryption → Parallel Upload → Index Update",
      cache_hierarchy: "L1: Memory → L2: IndexedDB → L3: Service Worker → L4: CDN → L5: GitHub API",
      search: "O(1) search via inverted index"
    },
    security: [
      "AES-256-GCM Encryption",
      "Private Repository Isolation",
      "Auth.js Session Management",
      "GitHub API Rate Limiting"
    ],
    performance: [
      "Cloudflare Worker CDN",
      "Multi-layer Caching Strategy",
      "Concurrent Chunk Processing"
    ],
    status: "Completed",
    isMain: true,
    priority: 2
  },
  {
    id: 4,
    name: "SurveySense — AI Survey Platform",
    fullName: "SurveySense — AI-Driven Survey Web Application",
    shortTitle: "SurveySense",
    description: "A full-stack AI-powered survey platform that generates intelligent questions using LLMs and provides real-time analytics with interactive visualizations.",
    featured: true,
    tools: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Supabase", "OpenRouter (Claude 3.5 Sonnet)", "Chart.js"],
    role: "Full Stack AI Developer",
    code: "https://github.com/AbraraliS/SurveySense",
    demo: "https://surveysense.vercel.app/",
    date: "2026",
    status: "Completed",
    category: "AI / Full Stack",
    type: "AI SaaS Application",
    images: [
      "/projects/surveysense/surveysense-main.png",
      "/projects/surveysense/surveysense-overview.png",
      "/projects/surveysense/surveysense-generator.png",
      "/projects/surveysense/surveysense-survey.png",
      "/projects/surveysense/surveysense-analytics.png",
      "/projects/surveysense/surveysense-charts.png"
    ],
    thumbnail: "/projects/surveysense/surveysense-main.png",
    videos: ["https://youtu.be/mZARUwXdfHw"],
    highlights: [
      "Automates survey creation using LLMs",
      "Provides actionable insights with visual analytics",
      "Scalable architecture with Supabase backend"
    ],
    features: [
      "AI-powered contextual survey question generation",
      "Dynamic MCQ and text-based question distribution",
      "Unique survey sharing with multiple responses",
      "Real-time analytics with charts and word frequency analysis",
      "Interactive dashboard for insights",
      "Fully responsive UI across devices"
    ],
    system_architecture: {
      type: "AI-Powered Survey Architecture",
      components: [
        "Frontend: React + Vite + Tailwind",
        "Backend: Node.js + Express",
        "Database: Supabase",
        "AI: OpenRouter (Claude 3.5)"
      ],
      flow: "User Prompt → OpenRouter LLM → Generated Survey → Supabase DB → Interactive Analytics"
    },
    analytics: {
      description: "Comprehensive insights and visualizations for survey responses.",
      features: [
        "Chart.js visualizations",
        "Word frequency analysis",
        "Response insights"
      ]
    },
    isMain: true,
    priority: 3
  }
];
