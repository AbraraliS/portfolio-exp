import type { MetadataRoute } from "next";
import { allPosts } from "@/../utils/Data/posts";
import { projectsData } from "@/../utils/Data/projects-data";
import { SITE_URL } from "@/../utils/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/projects`, priority: 0.9 },
    { url: `${SITE_URL}/about`, priority: 0.8 },
    { url: `${SITE_URL}/blog`, priority: 0.8 },
    { url: `${SITE_URL}/contact`, priority: 0.7 },
    { url: `${SITE_URL}/privacy`, priority: 0.2 },
    ...projectsData.map((project) => ({
      url: `${SITE_URL}/projects/${project.id}`,
      priority: 0.7,
    })),
    ...allPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      priority: 0.7,
    })),
  ];
}
