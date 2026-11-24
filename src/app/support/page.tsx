import type { Metadata } from "next";
import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import JsonLd from "../components/site/JsonLd";

const SUPPORT_URL = "https://buymeacoffee.com/abraralis";
const description =
  "Support AbrarAli S. and the free tools and apps he builds at Criza Labs, with a coffee or for free by sharing, starring and sending feedback.";

export const metadata: Metadata = {
  title: "Support my work",
  description,
  alternates: { canonical: "/support" },
  ...shareMeta({
    title: "Support my work | AbrarAli S.",
    description,
    path: "/support",
  }),
};

export default function SupportPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Support", path: "/support" },
        ])}
      />
      <header className="page-head">
        <div className="page-head-inner">
          <h1>Support my work</h1>
          <p>Optional, always. Everything I make stays free to use.</p>
        </div>
      </header>
      <div className="article-shell article-shell-single">
        <div className="prose">
          <p>
            Crizo for Android, CrizaVoise and CrizaTools are free. If one of
            them saved you time, a coffee helps me keep them free and build the
            next one.
          </p>
          <p>
            <a
              className="btn btn-signal"
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Buy me a coffee</span>
            </a>
          </p>
          <h2>Free ways to help</h2>
          <ul>
            <li>
              Star the public repositories on{" "}
              <a href={personalData.github}>GitHub</a>.
            </li>
            <li>Share a tool or an article with someone it would help.</li>
            <li>
              Send feedback or a feature idea to{" "}
              <a href={`mailto:${personalData.email}`}>{personalData.email}</a>.
            </li>
          </ul>
          <p>
            See what the support goes into on the{" "}
            <Link href="/projects">projects page</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
