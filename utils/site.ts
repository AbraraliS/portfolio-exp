import type { Metadata } from "next";
import { CSSProperties } from "react";
import { ProjectLine } from "@/Types/types";

export const SITE_URL = "https://abrarali.vercel.app";

const DEFAULT_SHARE_IMAGE = "/og.png";

/** Complete Open Graph and Twitter tags for a page. */
export const shareMeta = ({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_SHARE_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile";
  image?: string;
}): Pick<Metadata, "openGraph" | "twitter"> => ({
  openGraph: {
    title,
    description,
    url: path,
    siteName: "Abrarali Sunasara",
    locale: "en_US",
    type,
    images: [{ url: image, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
});

/**
 * Sets a discipline's colour on an element. --c is tuned for the light ground,
 * --cd for the dark one; dark surfaces inside the element use --cd.
 */
export const lineStyle = (line: ProjectLine) =>
  ({
    "--c": `var(--line-${line})`,
    "--cd": `var(--line-${line}-bright)`,
  }) as CSSProperties;

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
