import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/../utils/Data/posts";
import { projectName, projectsInOrder } from "@/../utils/project-helpers";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import JsonLd from "../components/site/JsonLd";

const description =
  "Every page on Abrarali Sunasara's portfolio in one list: main pages, project case studies and blog articles.";

export const metadata: Metadata = {
  title: "Sitemap",
  description,
  alternates: { canonical: "/sitemap" },
  ...shareMeta({
    title: "Sitemap | Abrarali Sunasara",
    description,
    path: "/sitemap",
  }),
};

const pages = [
  { label: "Home", href: "/" },
  { label: "All projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export default function SitemapPage() {
  const groups = [
    { title: "Pages", links: pages },
    {
      title: "Projects",
      links: projectsInOrder().map((project) => ({
        label: projectName(project),
        href: `/projects/${project.id}`,
      })),
    },
    {
      title: "Articles",
      links: allPosts().map((post) => ({
        label: post.title,
        href: `/blog/${post.slug}`,
      })),
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Sitemap", path: "/sitemap" },
        ])}
      />
      <header className="page-head">
        <div className="page-head-inner">
          <h1>Sitemap</h1>
          <p>Every page on this site, in one list.</p>
        </div>
      </header>
      <div className="plain-shell sitemap-groups">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="subhead">{group.title}</h2>
            <ul className="plain-rows plain-rows-tight">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <strong>{link.label}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
