import type { Metadata } from "next";
import Link from "next/link";
import { personalData } from "@/../utils/Data/PersonalData";
import { breadcrumbJsonLd, shareMeta } from "@/../utils/site";
import ContactForm from "../components/home/ContactForm";
import JsonLd from "../components/site/JsonLd";
import { socials } from "../components/site/socials";

const description =
  "Contact Abrarali Sunasara about engineering roles and freelance work in full stack development, system design and AI integration.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  ...shareMeta({
    title: "Contact | Abrarali Sunasara",
    description: description,
    path: "/contact",
  }),
};

export default function ContactPage() {
  return (
    <section className="contact">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="closing-light" aria-hidden="true" />
      <div className="contact-inner">
        <div className="contact-copy">
          <h1>Let's build real systems</h1>
          <p>
            I'm available for engineering roles and freelance work. Tell me what
            you're building, or reach me directly.
          </p>
          <dl className="contact-direct">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${personalData.email}`}>
                  {personalData.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${personalData.phone.replace(/\s/g, "")}`}>
                  {personalData.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{personalData.address}</dd>
            </div>
          </dl>
          <ul className="contact-socials">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                >
                  <social.icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ContactForm email={personalData.email} />
          <p className="form-privacy">
            Your message is only used to reply to you. Read the{" "}
            <Link href="/privacy">privacy policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
