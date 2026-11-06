import type { Metadata } from "next";
import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import JsonLd from "../components/site/JsonLd";

const description =
  "What this website collects and why: contact form messages sent through Resend, no analytics and no advertising cookies.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  ...shareMeta({
    title: "Privacy | Abrarali Sunasara",
    description: description,
    path: "/privacy",
  }),
};

const UPDATED = "6 November 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <header className="page-head">
        <div className="page-head-inner">
          <h1>Privacy</h1>
          <p>This site collects very little. Here is exactly what it does.</p>
        </div>
      </header>
      <div className="article-shell article-shell-single">
        <div className="prose">
          <p className="prose-updated">Last updated {UPDATED}</p>

          <h2>The contact form</h2>
          <p>
            When you use the <Link href="/contact">contact form</Link>, your
            name, email address and message are sent to me by email through{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend
            </a>
            , an email delivery service. I use these details only to read and
            reply to your message.
          </p>
          <p>
            If you would rather not use the form, you can email me directly at{" "}
            <a href={`mailto:${personalData.email}`}>{personalData.email}</a>.
          </p>

          <h2>The pipeline demo</h2>
          <p>
            Text you type into the demo on the home page is processed in your
            browser and kept in memory until you leave the page. It is never
            sent anywhere.
          </p>

          <h2>Analytics and cookies</h2>
          <p>
            This site does not use analytics, advertising trackers or cookies of
            its own. Fonts are served from this site rather than from a third
            party.
          </p>

          <h2>Offline support</h2>
          <p>
            This site can be installed as an app. To support that, your browser
            stores copies of pages and images on your device through a service
            worker. This stays on your device and isn't sent to me. You can
            remove it by clearing this site's data in your browser.
          </p>

          <h2>Hosting</h2>
          <p>
            The site is hosted on Vercel, which, like most hosting providers,
            may process technical data such as IP addresses in order to deliver
            pages and keep the service secure.
          </p>

          <h2>Video and external links</h2>
          <p>
            Project pages can show a YouTube video. Nothing loads from YouTube
            except a preview image until you press play, and then the player
            loads from YouTube's privacy-enhanced domain. Links to GitHub,
            LinkedIn, live demos and other sites are covered by those sites' own
            policies.
          </p>

          <h2>Your data</h2>
          <p>
            To ask about or delete a message you sent me, email{" "}
            <a href={`mailto:${personalData.email}`}>{personalData.email}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
