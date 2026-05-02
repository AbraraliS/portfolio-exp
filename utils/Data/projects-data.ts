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
    name: "Full Stack AI SaaS",
    description: "Production-ready SaaS system integrating frontend, backend APIs, AI services, and database architecture.",
    featured: true,
    tools: ["Next.js", "Node.js", "Spring Boot", "PostgreSQL"],
    role: "Full Stack Engineer",
    code: "",
    demo: "",
    date: "",
    images: ["/placeholder/placeholder.png"],
    videos: [""],
    highlights: [],
    challenges: [],
    system_architecture: {
      type: "Modular full-stack system",
      components: [
        "Frontend",
        "Backend API",
        "AI Services",
        "Database"
      ],
      flow: "Client → API → AI → DB → Response"
    },
    api_schema: {
      user: [
        "GET /user/profile",
        "PUT /user/update"
      ],
      ai: [
        "POST /ai/chat"
      ]
    }
  },
  {
    id: 3,
    name: "Mobile App System",
    description: "Cross-platform mobile application integrated with backend APIs and real-time systems.",
    featured: false,
    tools: ["React Native", "Node.js", "Firebase"],
    role: "Full Stack Engineer",
    code: "",
    demo: "",
    date: "",
    images: ["/placeholder/placeholder.png"],
    videos: [""],
    highlights: [],
    challenges: [],
    system_architecture: {
      type: "Client-server mobile architecture",
      components: [
        "Mobile App (React Native)",
        "Backend API (Node.js)",
        "Authentication Service",
        "Database (Firebase/PostgreSQL)"
      ],
      flow: "Mobile App → API → Database → Response"
    },
    api_schema: {
      auth: [
        "POST /login",
        "POST /signup"
      ],
      data: [
        "GET /data",
        "POST /data"
      ]
    }
  }
];
