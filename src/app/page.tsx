import type { Metadata } from "next";
import About from "./components/home/About";
import Closing from "./components/home/Closing";
import Hero from "./components/home/Hero";
import LatestPosts from "./components/home/LatestPosts";
import LiveNow from "./components/home/LiveNow";
import Skills from "./components/home/Skills";
import Work from "./components/home/Work";

/** The Live now section refreshes its data at most every 10 minutes. */
export const revalidate = 600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="route">
        <LiveNow />
        <Work />
        <Skills />
        <About />
        <LatestPosts />
      </div>
      <Closing />
    </>
  );
}
