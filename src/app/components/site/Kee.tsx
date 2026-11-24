"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Kee, the portfolio's companion (2026-11-24): the Keystone A brought to life. The arch is his body,
 * two eyes live inside it and the red keystone is his heart. He watches the pointer (or the scroll on
 * touch screens), blinks, dozes when nothing happens and, when tapped, hops and shares one true line
 * about the work. Hidden with one tap; still under reduced motion. Plain SVG, no library.
 */
const LINES = [
  "Hi, I'm Kee. AbrarAli drew me from his logo.",
  "Crizo for Android is free. It files your payments by itself.",
  "CrizaTools has 67 free tools, and none of them upload your files.",
  "CrizaVoise bills a whole shop counter with no internet at all.",
  "Press Ctrl K to search this whole site.",
  "Everything in Live now is real, refreshed every few minutes.",
  "Want something built? Criza Labs is one email away.",
];

export default function Kee() {
  const root = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [line, setLine] = useState<string | null>(null);
  const [mood, setMood] = useState<"idle" | "curious" | "sleep" | "hop">(
    "idle",
  );
  const [blink, setBlink] = useState(false);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const next = useRef(0);
  const idle = useRef<number>(0);

  useEffect(() => {
    setHidden(localStorage.getItem("kee-hidden") === "1");
  }, []);

  const wake = useCallback(() => {
    window.clearTimeout(idle.current);
    setMood((m) => (m === "sleep" ? "idle" : m));
    idle.current = window.setTimeout(() => setMood("sleep"), 12000);
  }, []);

  useEffect(() => {
    if (hidden) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return;

    // Blink every 3 to 6 seconds.
    let blinkTimer = 0;
    const schedule = () => {
      blinkTimer = window.setTimeout(
        () => {
          setBlink(true);
          window.setTimeout(() => setBlink(false), 140);
          schedule();
        },
        3000 + Math.random() * 3000,
      );
    };
    schedule();

    const towards = (cx: number, cy: number) => {
      const box = root.current?.getBoundingClientRect();
      if (!box) return;
      const dx = cx - (box.left + box.width / 2);
      const dy = cy - (box.top + box.height / 2);
      const d = Math.max(1, Math.hypot(dx, dy));
      setLook({ x: (dx / d) * 1.4, y: (dy / d) * 1.2 });
    };
    const onMove = (e: PointerEvent) => {
      towards(e.clientX, e.clientY);
      const t = e.target as Element | null;
      setMood((m) =>
        m === "hop" ? m : t?.closest("a, button") ? "curious" : "idle",
      );
      wake();
    };
    let last = window.scrollY;
    const onScroll = () => {
      const down = window.scrollY > last;
      last = window.scrollY;
      setLook({ x: 0, y: down ? 1.2 : -1.2 });
      wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    wake();
    return () => {
      window.clearTimeout(blinkTimer);
      window.clearTimeout(idle.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hidden, wake]);

  const talk = () => {
    setLine(LINES[next.current % LINES.length]);
    next.current += 1;
    setMood("hop");
    window.setTimeout(() => setMood("idle"), 600);
    wake();
  };

  if (hidden) return null;

  const closed = blink || mood === "sleep";
  const wide = mood === "curious" ? 1.25 : 1;

  return (
    <div ref={root} className={`kee kee-${mood}`}>
      {line && (
        <p className="kee-bubble" role="status">
          {line}
        </p>
      )}
      <button
        type="button"
        className="kee-body"
        onClick={talk}
        aria-label="Kee, the site companion. Tap for a fact about AbrarAli's work"
      >
        <svg viewBox="0 0 64 64" width="80" height="80" aria-hidden="true">
          <ellipse cx="32" cy="58" rx="17" ry="3" fill="#000" opacity="0.35" />
          <path
            d="M12 54C21 39 28 24 32 9C36 24 43 39 52 54"
            fill="none"
            stroke="#e7ece9"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g transform={`translate(${look.x} ${look.y})`}>
            {closed ? (
              <>
                <path
                  d="M26.2 39q2 1.6 4 0"
                  stroke="#e7ece9"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M33.8 39q2 1.6 4 0"
                  stroke="#e7ece9"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <ellipse
                  cx="27.9"
                  cy="38"
                  rx={2.7 * wide}
                  ry={3.2 * wide}
                  fill="#e7ece9"
                />
                <ellipse
                  cx="36.1"
                  cy="38"
                  rx={2.7 * wide}
                  ry={3.2 * wide}
                  fill="#e7ece9"
                />
                <circle
                  cx={27.9 + look.x * 0.6}
                  cy={38.5 + look.y * 0.5}
                  r="1.45"
                  fill="#0b0e0d"
                />
                <circle
                  cx={36.1 + look.x * 0.6}
                  cy={38.5 + look.y * 0.5}
                  r="1.45"
                  fill="#0b0e0d"
                />
              </>
            )}
          </g>
          <path
            className="kee-heart"
            d="M32 44.5 35.5 49 32 53.5 28.5 49Z"
            fill="#ef4444"
          />
        </svg>
        {mood === "sleep" && (
          <span className="kee-z" aria-hidden="true">
            z
          </span>
        )}
      </button>
      <button
        type="button"
        className="kee-hide"
        onClick={() => {
          localStorage.setItem("kee-hidden", "1");
          setHidden(true);
        }}
        aria-label="Hide Kee"
      >
        ×
      </button>
    </div>
  );
}
