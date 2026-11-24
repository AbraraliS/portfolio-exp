import type { Metadata } from "next";
import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import JsonLd from "../components/site/JsonLd";

const description =
  "The short terms for using this portfolio: what you may reuse, links to other sites, no warranty and how to raise a concern.";

export const metadata: Metadata = {
  title: "Terms of use",
  description,
  alternates: { canonical: "/terms" },
  ...shareMeta({
    title: "Terms of use | Abrarali Sunasara",
    description,
    path: "/terms",
  }),
};

const UPDATED = "24 November 2026";

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <header className="page-head">
        <div className="page-head-inner">
          <h1>Terms of use</h1>
          <p>Short and plain. Using this site means you accept them.</p>
        </div>
      </header>
      <div className="article-shell article-shell-single">
        <div className="prose">
          <p className="prose-updated">Last updated {UPDATED}</p>

          <h2>This website</h2>
          <p>
            This is the personal portfolio of {personalData.name}. It shows my
            work, writing and ways to reach me. By using it you accept these
            terms and the <Link href="/privacy">privacy notice</Link>.
          </p>

          <h2>Content and reuse</h2>
          <p>
            The words, images and designs here are mine or used with permission.
            You may quote and link to them with credit. Please ask before
            reusing anything else. Code in public repositories follows the
            licence in each repository.
          </p>

          <h2>Links to other sites</h2>
          <p>
            Some links lead to other websites, including the sites of Criza
            Labs. Each site has its own terms and privacy notice.
          </p>

          <h2>No warranty</h2>
          <p>
            Everything here is shared as it is, for information. I am not
            responsible or liable for any loss that comes from using this site,
            its content or the sites it links to, as far as the law allows.
          </p>

          <h2>Questions and concerns</h2>
          <p>
            If something is wrong, please write to{" "}
            <a href={`mailto:${personalData.email}`}>{personalData.email}</a>{" "}
            first, and we will sort it out together. These terms follow the laws
            of India.
          </p>
        </div>
      </div>
    </>
  );
}
