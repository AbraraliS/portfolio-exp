import { Post, PostBlock } from "@/Types/types";
import { buildingCriza } from "./building-criza";
import { gitstoreUploadPipeline } from "./gitstore-upload-pipeline";
import { llmFeatures } from "./llm-features";
import { oneServiceOrThree } from "./one-service-or-three";
import { performanceSeo } from "./performance-seo";
import { responsive } from "./responsive";

/** Listed newest first; entries with the same date keep this order. */
const posts: Post[] = [
  buildingCriza,
  llmFeatures,
  gitstoreUploadPipeline,
  oneServiceOrThree,
  responsive,
  performanceSeo,
];

export const allPosts = (): Post[] =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const findPost = (slug: string) =>
  posts.find((post) => post.slug === slug);

export const postsForProject = (projectId: string | number) =>
  allPosts().filter((post) => post.projects.includes(String(projectId)));

const WORDS_PER_MINUTE = 220;

const blockWords = (block: PostBlock): number => {
  const count = (text: string) => text.trim().split(/\s+/).length;
  switch (block.t) {
    case "list":
      return block.items.reduce((sum, item) => sum + count(item), 0);
    case "table":
      return block.rows.flat().reduce((sum, cell) => sum + count(cell), 0);
    case "route":
      return block.stops.length;
    default:
      // Code is read more slowly than prose, but skimmed more often. It counts in full.
      return count("text" in block ? block.text : block.code);
  }
};

export const readingMinutes = (post: Post) =>
  Math.max(
    1,
    Math.round(
      post.blocks.reduce((sum, block) => sum + blockWords(block), 0) /
        WORDS_PER_MINUTE,
    ),
  );

export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const formatPostDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
