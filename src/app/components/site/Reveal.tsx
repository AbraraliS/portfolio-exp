"use client";

import { ElementType, ReactNode, useEffect, useRef } from "react";

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}

/**
 * Adds .is-in the first time the element scrolls into view. The hidden state
 * lives in CSS behind html.js and prefers-reduced-motion, so content stays
 * visible without JS and for people who ask for less motion.
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
