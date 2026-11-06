import type { Metadata } from "next";
import { allPosts } from "@/../utils/Data/posts";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import PostCard from "../components/blog/PostCard";
import JsonLd from "../components/site/JsonLd";

const description =
  "Articles on system design, AI features, responsive frontends and web performance, drawn from real projects with real code, by Abrarali Sunasara.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  ...shareMeta({
    title: "Blog | Abrarali Sunasara",
    description: description,
    path: "/blog",
  }),
};

export default function BlogPage() {
  const [latest, ...rest] = allPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <header className="page-head">
        <div className="page-head-inner">
          <h1>Blog</h1>
          <p>
            What I've learned building these systems, including the mistakes,
            with the real code from my projects.
          </p>
        </div>
      </header>
      <div className="plain-shell">
        <h2 className="sr-only">Articles</h2>
        <div className="post-grid">
          <PostCard post={latest} lead />
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
