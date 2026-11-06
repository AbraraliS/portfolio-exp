import type { MetadataRoute } from "next";
import { allPosts } from "@/../utils/Data/posts";
import { projectsData } from "@/../utils/Data/projects-data";
import { SITE_URL } from "@/../utils/site";

/** When the site's pages last changed. Update this with significant content changes. */
const PAGES_UPDATED = "2026-11-06";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({
    url: `${SITE_URL}${path}`,
    lastModified: PAGES_UPDATED,
    priority,
  });

  return [
    page("", 1),
    page("/projects", 0.9),
    page("/about", 0.8),
    page("/blog", 0.8),
    page("/contact", 0.7),
    page("/privacy", 0.2),
    page("/sitemap", 0.2),
    ...projectsData.map((project) => page(`/projects/${project.id}`, 0.7)),
    ...allPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      priority: 0.7,
    })),
  ];
}
