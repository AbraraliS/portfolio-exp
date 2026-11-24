"use client";

import { useEffect, useRef } from "react";

/**
 * The footer name, centred, in the style of criza.dev's wordmark: quiet solid letters lit by a soft
 * pool of colour that sweeps across once when it comes into view, then follows the pointer.
 * Decorative only (the name is in the copyright line), so it is hidden from screen readers.
 */
export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "";
          seen.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    seen.observe(el);

    if (still || !window.matchMedia("(hover: hover)").matches)
      return () => seen.disconnect();

    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      el.dataset.lit = "";
      el.style.setProperty(
        "--wx",
        `${((event.clientX - box.left) / box.width) * 100}%`,
      );
    };
    const leave = () => {
      delete el.dataset.lit;
      el.style.removeProperty("--wx");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      seen.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="name-mark" aria-hidden="true">
      AbrarAli<span className="name-mark-s">S.</span>
    </div>
  );
}
