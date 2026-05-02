import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "@/../utils/ScrollToTopButton";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Abrarali Sunasara | Full Stack & Systems Engineer",
  description:
    "I design and build complete systems — from frontend interfaces and mobile apps to backend architecture, APIs, and AI-driven workflows.",
  keywords: [
    "Abrarali Sunasara",
    "Full Stack & Systems Engineer",
    "System Architecture",
    "AI Integration",
    "Backend Developer",
    "React Native",
  ],
  authors: [{ name: "Abrarali Sunasara" }],
  openGraph: {
    title: "Abrarali Sunasara | Full Stack & Systems Engineer",
    description:
      "I design and build complete systems — from frontend interfaces and mobile apps to backend architecture, APIs, and AI-driven workflows.",
    url: "https://abraralisunasara.vercel.app", // Placeholder
    siteName: "Abrarali Sunasara Portfolio",
    images: [
      {
        url: "/Website-overview.png", // Assuming kept same
        width: 1200,
        height: 630,
        alt: "Abrarali Sunasara Portfolio Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abrarali Sunasara | Full Stack & Systems Engineer",
    description:
      "I design and build complete systems — from frontend interfaces and mobile apps to backend architecture.",
    images: ["/Website-overview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="text-white">
          <div className="container">{children}</div>
        </main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
