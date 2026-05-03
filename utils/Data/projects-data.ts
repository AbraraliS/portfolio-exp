import { Project } from "@/Types/types";

export const projectsData: Project[] = [
  {
    id: "buysmart-ai",
    name: "BuySmart AI — Intelligent Product Analysis Platform",
    shortTitle: "BuySmart AI",
    description: "A microservices-based AI platform that analyzes products using real-time data, generates objective recommendations with Gemini AI, and helps users make data-driven purchasing decisions.",
    category: "AI / System Design / Full Stack",
    type: "AI Decision System",
    role: "Full Stack AI Systems Engineer",
    featured: true,
    isMain: false,
    date: "2026",
    tools: [
      "React",
      "TypeScript",
      "Spring Boot",
      "Java",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Supabase",
      "Gemini AI",
      "Recharts",
      "Tailwind CSS"
    ],
    features: [
      "AI-powered product analysis with Buy Score, pros, and cons",
      "Microservices architecture (Frontend + Spring Boot + AI service)",
      "Real-time product data fetching with caching",
      "JWT-based authentication and secure user sessions",
      "Wishlist with price tracking and history",
      "Fallback system when AI service is unavailable",
      "Interactive dashboard with analytics and insights"
    ],
    highlights: [
      "Implements real-world microservice architecture with AI integration",
      "Optimized using caching and containerized deployment",
      "Bridges AI with real-time e-commerce decision systems"
    ],
    status: "Completed",
    images: [
      "/assets/projects/buysmart/buysmart-overview.png",
      "/assets/projects/buysmart/buysmart-dashboard.png",
      "/assets/projects/buysmart/buysmart-analysis.png",
      "/assets/projects/buysmart/buysmart-search.png",
      "/assets/projects/buysmart/buysmart-architecture.png",
      "/assets/projects/buysmart/buysmart-wishlist.png"
    ],
    thumbnail: "/assets/projects/buysmart/buysmart-overview.png",
    system_architecture: {
      type: "Microservices Architecture",
      components: [
        "Frontend (React)",
        "Backend (Spring Boot)",
        "AI Service (FastAPI + Gemini)",
        "Database (PostgreSQL)"
      ],
      flow: "Search → Fetch → Analyze → Recommend"
    },
    pipeline: [
      "Search",
      "Fetch",
      "Analyze",
      "Recommend"
    ],
    github: "https://github.com/AbraraliS/BuySmart-ai",
    docs: "https://github.com/AbraraliS/BuySmart-ai#readme",
    priority: 3
  },
  {
    id: "1",
    name: "TIPS — Temporal Interview Profiling System",
    shortTitle: "TIPS",
    description: "A multimodal AI system that analyzes recorded video interviews using audio, video, and LLM-based semantic evaluation to generate objective, time-evolving candidate assessments.",
    featured: true,
    tools: ["Python", "FastAPI", "WebRTC", "OpenCV", "MediaPipe", "Whisper", "PyTorch", "Transformers", "Chart.js"],
    role: "System Architecture",
    github: "https://github.com/AbraraliS/TIPS-LLM",
    date: "2026",
    status: "Completed",
    isMain: true,
    priority: 1,
    category: "AI / System Design",
    type: "Advanced AI System",
    images: [
      "/projects/tips/tips-overview.png",
      "/assets/projects/tips/tips-architecture-v2.png",
      "/projects/tips/tips-dashboard.png",
      "/projects/tips/tips-timeline.png",
      "/projects/tips/tips-analysis.png",
      "/projects/tips/tips-qa.png"
    ],
    thumbnail: "/projects/tips/tips-overview.png",
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
      type: "Multimodal Temporal Analysis Pipeline (Hybrid Signal + LLM)",
      components: [
        "6-stage Analysis Pipeline",
        "Audio/Video Feature Extraction",
        "Whisper Speech-to-Text",
        "AI Semantic Scorer (Qwen2.5-3B)",
        "Temporal Performance Tracker",
        "Interactive Analytics Dashboard"
      ],
      flow: "Input (AV/JD) → Parallel Extraction → Temporal Sync → Behavioral/Semantic Analysis → Output (JSON/Dashboard)"
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
    id: "2",
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
    id: "3",
    name: "GitStore — GitHub-Based Distributed File System",
    github: "https://github.com/AbraraliS/GitSmartStorage",
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
    id: "4",
    name: "SurveySense — AI Survey Platform",
    fullName: "SurveySense — AI-Driven Survey Web Application",
    shortTitle: "SurveySense",
    description: "A full-stack AI-powered survey platform that generates intelligent questions using LLMs and provides real-time analytics with interactive visualizations.",
    featured: true,
    tools: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Supabase", "OpenRouter (Claude 3.5 Sonnet)", "Chart.js"],
    role: "Full Stack AI Developer",
    github: "https://github.com/AbraraliS/SurveySense",
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
  },
  {
    id: "5",
    name: "LabelFlow — Data Annotation & QA Platform",
    shortTitle: "LabelFlow",
    description: "A scalable data annotation platform that manages the full labeling lifecycle with multi-level quality assurance, task orchestration, and integrated payment workflows.",
    category: "System Design / Full Stack / Platform",
    type: "Workflow & Annotation System",
    role: "Full Stack System Architect",
    featured: false,
    date: "2026",
    status: "Completed",
    isMain: false,
    priority: 5,
    tools: [
      "Node.js",
      "React",
      "PostgreSQL",
      "Queue Workers",
      "JWT/Auth",
      "Cloud Storage",
      "REST APIs"
    ],
    features: [
      "End-to-end annotation lifecycle (upload → split → annotate → review → payout)",
      "Multi-level QA system (L1 annotators, L2/L3 reviewers)",
      "Task orchestration with locking, timeout, and retry mechanisms",
      "Role-based access control and workflow enforcement",
      "Escrow-style payment system with audit tracking",
      "Scalable task distribution and parallel processing",
      "Comprehensive audit logs for all actions and transitions",
      "Support for multi-modal data (text, image, video, audio)"
    ],
    highlights: [
      "Designed production-grade workflow engine for annotation systems",
      "Ensures data quality via structured multi-stage review pipeline",
      "Integrates operational workflows with financial systems (payments + escrow)"
    ],
    system_architecture: {
      type: "Multi-Stage Workflow Engine",
      components: [
        "Task Ingestion & Splitting",
        "L1 Annotation Queue",
        "L2/L3 Review Pipeline",
        "Escrow Payment Engine",
        "Audit & Logging Layer"
      ],
      flow: "Upload → Split → L1 Annotate → L2 Review → L3 Approve → Export + Payout"
    },
    capabilities: [
      "Annotator (L1): Task assignment, submission, and payment tracking",
      "Reviewer (L2): QA review and approval/rejection workflow",
      "Super Reviewer (L3): Final arbitration and escalation resolution",
      "Admin: Dataset management, role assignment, and audit access"
    ],
    deployment: {
      platforms: ["Cloud (AWS/GCP)", "On-Premise", "Docker"],
      highlights: [
        "Queue-based task distribution for horizontal scaling",
        "Configurable retry and timeout policies per task type",
        "Pluggable storage adapters for S3/GCS/Azure"
      ]
    },
    security: [
      "JWT-based authentication with role scopes",
      "Task locking prevents concurrent annotation conflicts",
      "Full audit trail for every state transition",
      "Escrow model ensures payment integrity"
    ],
    performance: [
      "Queue workers handle parallel task processing",
      "Database-level row locking for task state integrity",
      "Timeout-based task recovery prevents queue stalls"
    ]
  },
  {
    id: "6",
    name: "DataTalk Pro — AI Database Query Assistant",
    github: "https://github.com/AbraraliS/DataTalkPro",
    shortTitle: "DataTalk Pro",
    description: "A conversational AI system that allows users to interact with MySQL databases using natural language, generating and executing SQL queries with intelligent responses.",
    category: "AI / Data Systems",
    type: "AI Data Interface",
    role: "AI Engineer",
    featured: false,
    date: "2025",
    status: "Completed",
    isMain: false,
    priority: 6,
    tools: [
      "Python",
      "Streamlit",
      "LangChain",
      "Google Gemini AI",
      "MySQL",
      "SQLAlchemy"
    ],
    features: [
      "Natural language to SQL query generation",
      "Conversational interface with context awareness",
      "Real-time database interaction",
      "Formatted table outputs for query results",
      "Safety layer preventing destructive SQL operations",
      "Secure environment variable handling for API keys"
    ],
    highlights: [
      "Bridges AI with database querying for non-technical users",
      "Implements safe execution layer for SQL operations",
      "Improves data accessibility through conversational UI"
    ]
  },
  {
    id: "7",
    name: "AI ChatBot — Movie Recommendation System",
    shortTitle: "MovieBot",
    description: "A dual-mode AI chatbot powered by Gemini that supports general conversations and intelligent movie recommendations using natural language queries and OMDB integration.",
    category: "AI / Full Stack",
    type: "Conversational AI System",
    role: "Full Stack AI Developer",
    featured: false,
    date: "2025",
    status: "Completed",
    isMain: false,
    priority: 7,
    tools: [
      "FastAPI",
      "Python",
      "React",
      "Gemini AI",
      "OMDB API",
      "aiohttp"
    ],
    features: [
      "Dual-mode chatbot (general AI + movie recommendation)",
      "Natural language movie filtering (genre, rating, year, actors)",
      "AI-generated summaries for movie results",
      "Real-time data fetching from OMDB API",
      "Markdown-supported responses for better UX",
      "Asynchronous backend for performance optimization"
    ],
    highlights: [
      "Combines conversational AI with real-world API integration",
      "Advanced filtering using natural language understanding",
      "Scalable async backend architecture"
    ],
    github: "https://github.com/AbraraliS/Movie-Recommendations-ChatBot"
  },
  {
    id: "8",
    name: "InvenTrack Pro — Inventory Management Platform",
    shortTitle: "InvenTrack",
    description: "A full-stack inventory management system with real-time tracking, invoicing, barcode generation, and analytics for retail and warehouse operations.",
    category: "Full Stack / System",
    type: "Business Management System",
    role: "Full Stack Developer",
    featured: false,
    date: "2025",
    status: "Completed",
    isMain: false,
    priority: 8,
    tools: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MySQL",
      "Sequelize",
      "Tailwind CSS",
      "Cloudinary",
      "JWT"
    ],
    features: [
      "Real-time inventory tracking with alerts",
      "Invoice management with draft support",
      "Barcode generation and product management",
      "Customer and category management",
      "Analytics dashboard with charts",
      "Secure authentication using JWT"
    ],
    highlights: [
      "Complete retail/warehouse management solution",
      "Scalable REST API with structured backend",
      "Modern responsive UI with analytics support"
    ],
    "images": [
      "/assets/projects/inventrack/inventrack-dashboard.png",
      "/assets/projects/inventrack/inventrack-products.png",
      "/assets/projects/inventrack/inventrack-invoice.png",
      "/assets/projects/inventrack/inventrack-barcode.png",
      "/assets/projects/inventrack/inventrack-analytics.png",
      "/assets/projects/inventrack/inventrack-auth.png"
    ],
    "thumbnail": "/assets/projects/inventrack/inventrack-dashboard.png",
    "analytics": {
      "description": "Comprehensive insights and visualizations for inventory and sales performance.",
      "features": [
        "Real-time stock level monitoring",
        "Sales trends and forecasting",
        "Category-wise performance analysis"
      ]
    },
    "github": "https://github.com/AbraraliS/InvenTrackPro"
  }
];
