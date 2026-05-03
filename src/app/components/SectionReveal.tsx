"use client";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export default function SectionReveal({
  children,
  direction = "up",
  delay = 0,
}: SectionRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    switch (direction) {
      case "up":
        y = 40;
        break;
      case "down":
        y = -40;
        break;
      case "left":
        x = 40;
        break;
      case "right":
        x = -40;
        break;
    }

    // Safety: ensure element is always visible even if ScrollTrigger never fires
    // (can happen on mobile when element is already in view on mount, or on fast scroll)
    gsap.set(el, { opacity: 1, x: 0, y: 0 });

    const anim = gsap.fromTo(
      el,
      {
        opacity: 0,
        x: x,
        y: y,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%", // More forgiving threshold — fires sooner
          toggleActions: "play none none none",
          // Fallback: if element is already above the trigger point on load, play immediately
          onEnter: () => gsap.set(el, { opacity: 1 }),
        },
      },
    );

    // Critical safety net: if ScrollTrigger doesn't fire within 3s, force visibility
    const safetyTimer = setTimeout(() => {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
    }, 3000);

    return () => {
      anim.kill();
      clearTimeout(safetyTimer);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction, delay]);

  return <div ref={elementRef}>{children}</div>;
}
