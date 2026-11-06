import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist. Find projects and articles from here.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <header className="page-head page-head-full">
      <div className="page-head-inner">
        <p className="not-found-code">404</p>
        <h1>This stop doesn't exist</h1>
        <p>The page may have moved. These lines still run:</p>
        <div className="detail-actions">
          <Link href="/projects" className="btn btn-signal">
            <span>See all projects</span>
          </Link>
          <Link href="/blog" className="btn btn-ghost">
            <span>Read the blog</span>
          </Link>
          <Link href="/" className="btn btn-ghost">
            <span>Go to the home page</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
