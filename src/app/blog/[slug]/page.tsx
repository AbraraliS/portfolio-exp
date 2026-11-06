import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allPosts,
  findPost,
  formatPostDate,
  headingId,
  readingMinutes,
} from "@/../utils/Data/posts";
import { personalData } from "@/../utils/Data/PersonalData";
import { projectsData } from "@/../utils/Data/projects-data";
import { projectName } from "@/../utils/project-helpers";
import { breadcrumbJsonLd, lineStyle, SITE_URL } from "@/../utils/site";
import ArticleBody from "@/app/components/blog/ArticleBody";
import JsonLd from "@/app/components/site/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const image = `/blog/og/${post.slug}.png`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: personalData.name, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [personalData.name],
      tags: post.skills,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const posts = allPosts();
  const next = posts[(posts.indexOf(post) + 1) % posts.length];
  const minutes = readingMinutes(post);
  const headings = post.blocks.flatMap((block) =>
    block.t === "h2" ? [block.text] : [],
  );
  const related = post.projects.flatMap((id) => {
    const project = projectsData.find((item) => String(item.id) === id);
    return project ? [project] : [];
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/blog/og/${post.slug}.png`,
    keywords: post.skills.join(", "),
    author: { "@type": "Person", name: personalData.name, url: SITE_URL },
  };

  return (
    <article className="article" style={lineStyle(post.line)}>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <header className="page-head article-head">
        <div className="page-head-inner">
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li aria-current="page">Article</li>
            </ol>
          </nav>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p className="post-meta">
            <span>{personalData.name}</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span>{minutes} min read</span>
          </p>
        </div>
      </header>

      <div className="article-shell">
        <aside className="article-aside">
          <nav aria-label="On this page" className="article-toc-desktop">
            <h2>On this page</h2>
            <ul>
              {headings.map((heading) => (
                <li key={heading}>
                  <a href={`#${headingId(heading)}`}>{heading}</a>
                </li>
              ))}
            </ul>
          </nav>
          <details className="article-toc">
            <summary>
              On this page
              <ChevronDown aria-hidden="true" />
            </summary>
            <ul>
              {headings.map((heading) => (
                <li key={heading}>
                  <a href={`#${headingId(heading)}`}>{heading}</a>
                </li>
              ))}
            </ul>
          </details>
        </aside>

        <div className="article-main">
          <ArticleBody blocks={post.blocks} />

          <footer className="article-foot">
            {related.length > 0 && (
              <section>
                <h2>Projects in this article</h2>
                <ul className="article-related">
                  {related.map((project) => (
                    <li key={project.id} style={lineStyle(project.line)}>
                      <Link href={`/projects/${project.id}`}>
                        <strong>{projectName(project)}</strong>
                        <span>{project.type}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h2>Skills covered</h2>
              <ul className="card-tools">
                {post.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
            <section className="article-author">
              <h2>Written by {personalData.name}</h2>
              <p>
                {personalData.designation} in {personalData.address}.{" "}
                <Link href="/about">More about me</Link> or{" "}
                <Link href="/contact">get in touch</Link>.
              </p>
            </section>
            <Link href={`/blog/${next.slug}`} className="next-stop">
              <span>Next article</span>
              <strong>{next.title}</strong>
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
