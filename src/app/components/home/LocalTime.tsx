"use client";

import { useEffect, useState } from "react";

const format = () =>
  new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

/** The time in Bengaluru, ticking each half minute. Renders empty on the server to avoid a mismatch. */
export default function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30000);
    return () => window.clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time || "IST"}</span>;
}
