"use client";

/**
 * The home page as a cinematic scroll story. GSAP + ScrollTrigger (free standard licence) drive the
 * type and read each chapter's progress; Lenis (MIT) smooths the scroll; one three.js stage behind
 * everything shows Kee, a phone with Crizo and a laptop with CrizaVoise.
 * Under reduced motion the chapters simply stack, with no pinning or scrubbing.
 */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createStage, Progress } from "./stage";

export type GalleryItem = {
  id: string;
  name: string;
  category?: string;
  image?: string;
  year?: string;
};

const NAME = "AbrarAli S.";

export default function Cinema({
  gallery,
  email,
}: {
  gallery: GalleryItem[];
  email: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prog: Progress = {
      title: 0,
      kee: 0,
      crizo: 0,
      voise: 0,
      gallery: 0,
      close: 0,
    };

    let disposeStage = () => {};
    try {
      disposeStage = createStage(cv, prog, still, () => setReady(true));
    } catch {
      // No WebGL: the story still reads; the stage stays empty.
    }
    if (still) {
      el.classList.add("cine-still");
      return () => disposeStage();
    }

    let cleanup = () => {};
    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.1 });
      // A handle for automated screenshots to jump through the story.
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        // Chapter progress for the 3D stage.
        (Object.keys(prog) as (keyof Progress)[]).forEach((key) => {
          ScrollTrigger.create({
            trigger: `[data-ch="${key}"]`,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => (prog[key] = self.progress),
            onLeave: () => (prog[key] = 1),
            onLeaveBack: () => (prog[key] = 0),
          });
        });

        // 1. Title: letters arrive, then split apart as you scroll.
        gsap.from(".cine-letter", {
          yPercent: 110,
          opacity: 0,
          rotate: 8,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.05,
          delay: 0.15,
        });
        gsap.from(".cine-title-sub > *", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          delay: 0.6,
        });
        gsap.to(".cine-letter", {
          xPercent: (i: number, _t: unknown, all: unknown[]) =>
            (i - (all.length - 1) / 2) * 60,
          yPercent: (i: number) => (i % 2 ? -1 : 1) * 40,
          rotate: (i: number) => (i % 2 ? -14 : 14),
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: '[data-ch="title"]',
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        gsap.to(".cine-title-sub", {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: '[data-ch="title"]',
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        });

        // Chapter copy: rises in, holds, leaves.
        gsap.utils.toArray<HTMLElement>("[data-copy]").forEach((copy) => {
          const ch = copy.closest("[data-ch]");
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ch,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });
          tl.fromTo(
            copy.children,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.25,
              ease: "power2.out",
            },
          )
            .to(copy.children, { opacity: 1, duration: 0.5 })
            .to(copy.children, {
              y: -50,
              opacity: 0,
              stagger: 0.03,
              duration: 0.25,
              ease: "power2.in",
            });
        });

        // 5. The horizontal gallery.
        const track = el.querySelector<HTMLElement>(".cine-track");
        if (track) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + 48),
            ease: "none",
            scrollTrigger: {
              trigger: '[data-ch="gallery"]',
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        // 6. Closing type.
        gsap.from(".cine-close-word", {
          yPercent: 120,
          opacity: 0,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '[data-ch="close"]',
            start: "top 70%",
            end: "top top",
            scrub: true,
          },
        });
      }, el);

      cleanup = () => {
        ctx.revert();
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => {
      cleanup();
      disposeStage();
    };
  }, []);

  return (
    <div ref={root} className={`cine${ready ? " is-ready" : ""}`}>
      <div className="cine-stage" aria-hidden="true">
        <canvas ref={canvas} className="cine-canvas" />
        <div className="cine-glow" />
      </div>

      {/* 1. Title */}
      <section
        data-ch="title"
        className="cine-ch cine-ch-title"
        aria-label="Introduction"
      >
        <div className="cine-pin">
          <h1 className="cine-title" aria-label={NAME}>
            {NAME.split("").map((c, i) => (
              <span key={i} className="cine-letter" aria-hidden="true">
                {c === " " ? " " : c}
              </span>
            ))}
          </h1>
          <div className="cine-title-sub">
            <p className="cine-kicker">
              Full stack and AI engineer · Co-founder of Criza Labs
            </p>
            <p className="cine-lead">
              I build whole products: Android, web, backend and AI, from the
              first sketch to the shipped release.
            </p>
            <p className="cine-scroll" aria-hidden="true">
              Scroll <span />
            </p>
          </div>
        </div>
      </section>

      {/* 2. Kee */}
      <section data-ch="kee" className="cine-ch" aria-label="Meet Kee">
        <div className="cine-pin cine-pin-top">
          <div data-copy className="cine-copy cine-copy-center">
            <p className="cine-kicker">Chapter 01 · The guide</p>
            <h2 className="cine-h">Meet Kee.</h2>
            <p className="cine-lead">
              He walks you through what I build. Move your cursor; he is
              watching.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Crizo */}
      <section
        data-ch="crizo"
        className="cine-ch"
        aria-label="Crizo for Android"
      >
        <div className="cine-pin">
          <div data-copy className="cine-copy cine-copy-left">
            <p className="cine-kicker">Chapter 02 · Android</p>
            <h2 className="cine-h">Crizo for Android</h2>
            <p className="cine-lead">
              Notes, reminders, places and money in one private app. Payments
              file themselves from bank alerts, and Crizo the companion keeps it
              warm.
            </p>
            <ul className="cine-facts">
              <li>Kotlin · Jetpack Compose</li>
              <li>Data stays on the phone</li>
              <li>Signed updates, no store</li>
            </ul>
            <Link href="/projects/crizo-app" className="cine-link">
              Read the case study →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CrizaVoise */}
      <section data-ch="voise" className="cine-ch" aria-label="CrizaVoise">
        <div className="cine-pin">
          <div data-copy className="cine-copy cine-copy-right">
            <p className="cine-kicker">Chapter 03 · Desktop</p>
            <h2 className="cine-h">CrizaVoise</h2>
            <p className="cine-lead">
              Free, open source billing for the shop counter: GST invoices,
              thermal receipts, stock and payments, with no internet at all.
            </p>
            <ul className="cine-facts">
              <li>Flutter · SQLite</li>
              <li>Windows, Linux, macOS</li>
              <li>Apache 2.0</li>
            </ul>
            <Link href="/projects/crizavoise" className="cine-link">
              Read the case study →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Gallery */}
      <section
        data-ch="gallery"
        className="cine-ch cine-ch-gallery"
        aria-label="More work"
      >
        <div className="cine-pin cine-pin-gallery">
          <div className="cine-track">
            <div className="cine-track-head">
              <p className="cine-kicker">Chapter 04 · More work</p>
              <h2 className="cine-h">And the rest of the line.</h2>
              <Link href="/projects" className="cine-link">
                All projects →
              </Link>
            </div>
            {gallery.map((g) => (
              <Link key={g.id} href={`/projects/${g.id}`} className="cine-card">
                <span className="cine-card-img">
                  {g.image && (
                    <Image
                      src={g.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 80vw, 420px"
                    />
                  )}
                </span>
                <span className="cine-card-meta">
                  <span>{g.year}</span>
                  <span>{g.category}</span>
                </span>
                <span className="cine-card-name">{g.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Close */}
      <section
        data-ch="close"
        className="cine-ch cine-ch-close"
        aria-label="Contact"
      >
        <div className="cine-pin cine-pin-top">
          <div className="cine-close">
            <h2 className="cine-close-title">
              <span className="cine-close-word">Let&apos;s</span>{" "}
              <span className="cine-close-word">build.</span>
            </h2>
            <p className="cine-lead">
              Have a product in mind? Write to me, or hire the studio.
            </p>
            <div className="cine-actions">
              <a className="cine-btn" href={`mailto:${email}`}>
                {email}
              </a>
              <a
                className="cine-btn cine-btn-ghost"
                href="https://criza.dev/contact"
              >
                Hire Criza Labs
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
