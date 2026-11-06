import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import "./styles/motion.css";
import "./styles/blog.css";
import { personalData } from "@/../utils/Data/PersonalData";
import { allPosts } from "@/../utils/Data/posts";
import { projectName, projectsInOrder } from "@/../utils/project-helpers";
import CommandPalette, { PaletteItem } from "./components/site/CommandPalette";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";
import JsonLd from "./components/site/JsonLd";
import { shareMeta, SITE_URL } from "@/../utils/site";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const text = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});

const TITLE = "Abrarali Sunasara | Full Stack & Systems Engineer";
const DESCRIPTION =
  "Full stack and systems engineer in Bengaluru building complete products: interfaces and mobile apps, backend architecture, APIs and AI workflows.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Abrarali Sunasara" },
  description: DESCRIPTION,
  keywords: [
    "Abrarali Sunasara",
    "Full Stack Engineer",
    "Systems Engineer",
    "System Architecture",
    "AI Integration",
    "Backend Developer",
    "React Native",
    "Bengaluru",
  ],
  authors: [{ name: personalData.name, url: SITE_URL }],
  ...shareMeta({ title: TITLE, description: DESCRIPTION, path: "/" }),
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0C3B40",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalData.name,
  jobTitle: personalData.designation,
  worksFor: {
    "@type": "Organization",
    name: "Criza",
    url: "https://criza.dev",
  },
  url: SITE_URL,
  image: `${SITE_URL}/profile-portrait.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: [
    personalData.github,
    personalData.linkedIn,
    personalData.gitlab,
    personalData.youtube,
    personalData.twitter,
  ].filter(Boolean),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: personalData.name,
  url: SITE_URL,
};

const paletteItems: PaletteItem[] = [
  { label: "Home", hint: "Page", href: "/", terms: "start map" },
  { label: "All projects", hint: "Page", href: "/projects", terms: "work" },
  {
    label: "About",
    hint: "Page",
    href: "/about",
    terms: "experience education",
  },
  { label: "Blog", hint: "Page", href: "/blog", terms: "articles writing" },
  {
    label: "Contact",
    hint: "Page",
    href: "/contact",
    terms: "email hire phone",
  },
  ...projectsInOrder().map((project) => ({
    label: projectName(project),
    hint: project.type ?? "Project",
    href: `/projects/${project.id}`,
    terms: [project.name, project.category, ...(project.tools ?? [])]
      .join(" ")
      .toLowerCase(),
  })),
  ...allPosts().map((post) => ({
    label: post.title,
    hint: "Article",
    href: `/blog/${post.slug}`,
    terms: post.skills.join(" ").toLowerCase(),
  })),
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${text.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll reveals only hide content once we know JS can show it again. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette items={paletteItems} />
      </body>
    </html>
  );
}
