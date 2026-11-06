"use client";

import {
  BookOpen,
  FolderGit2,
  Mail,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { personalData } from "@/../utils/Data/PersonalData";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";
import Mark from "./Mark";
import { isCurrent, navItems } from "./nav-items";

const dockItems = [
  { label: "Work", href: "/#work", icon: FolderGit2 },
  { label: "About", href: "/about", icon: User },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: Mail },
];

const sheetItems = [
  ...navItems,
  { label: "All projects", href: "/projects" },
  { label: "Privacy", href: "/privacy" },
  ...(personalData.resume
    ? [{ label: "Resume", href: personalData.resume }]
    : []),
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dockHidden, setDockHidden] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  // One passive listener, throttled to a frame, drives both bars.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setDockHidden(y > last && y > 240);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The on-screen keyboard needs the room while someone is typing.
  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input, textarea");
    const onIn = (event: FocusEvent) => {
      if (isField(event.target)) setDockHidden(true);
    };
    const onOut = (event: FocusEvent) => {
      if (isField(event.target)) setDockHidden(false);
    };
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  // Track the home page section being read.
  useEffect(() => {
    setSection(null);
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
          else if (entry.target.id === section) setSection(null);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Mobile sheet: lock the page, close on Escape, keep Tab inside.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    document.body.style.overflow = "hidden";
    sheet.current?.querySelector("button")?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !sheet.current || !button) return;
      const stops = [
        button,
        ...sheet.current.querySelectorAll<HTMLElement>("a, button"),
      ];
      const index = stops.indexOf(document.activeElement as HTMLAnchorElement);
      const next = event.shiftKey ? index - 1 : index + 1;
      event.preventDefault();
      stops[(next + stops.length) % stops.length].focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled && !open;
  const activeDock = dockItems.findIndex((item) =>
    isCurrent(item.href, pathname, section),
  );

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />

      <header className={`nav ${solid ? "nav-solid" : ""}`}>
        <div className="nav-inner">
          <Link
            href="/"
            className="nav-brand"
            aria-label="Abrarali Sunasara, home"
          >
            <Mark size={38} />
            <span className="nav-name">Abrarali Sunasara</span>
          </Link>

          <nav aria-label="Main" className="nav-links">
            <button
              type="button"
              className="nav-search"
              onClick={() =>
                document.dispatchEvent(new Event(OPEN_PALETTE_EVENT))
              }
            >
              <Search aria-hidden="true" />
              Search
              <kbd>Ctrl K</kbd>
            </button>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.href === "/contact" ? "nav-cta" : "nav-link"}
                aria-current={
                  isCurrent(item.href, pathname, section) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Phones: primary navigation sits within reach of the thumb. */}
      <nav
        aria-label="Quick"
        className={`dock ${dockHidden && !open ? "dock-hidden" : ""}`}
        style={{ "--active": activeDock } as React.CSSProperties}
      >
        {activeDock >= 0 && !open && (
          <span className="dock-indicator" aria-hidden="true" />
        )}
        {dockItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="dock-item"
            onClick={() => setOpen(false)}
            aria-current={index === activeDock ? "page" : undefined}
          >
            <item.icon aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        ))}
        <button
          ref={menuButton}
          type="button"
          className="dock-item"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </nav>

      <div
        ref={sheet}
        id="site-menu"
        className={`nav-sheet ${open ? "is-open" : ""}`}
      >
        <button
          type="button"
          className="sheet-search"
          onClick={() => {
            setOpen(false);
            document.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
          }}
        >
          <Search aria-hidden="true" />
          Search projects and articles
        </button>
        <nav aria-label="Menu">
          <ol className="nav-sheet-list">
            {sheetItems.map((item, index) => (
              <li
                key={item.href}
                style={{ "--i": index } as React.CSSProperties}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    isCurrent(item.href, pathname, section) ? "page" : undefined
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
