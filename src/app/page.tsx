import type { Metadata } from "next";
import About from "./components/home/About";
import Closing from "./components/home/Closing";
import Hero from "./components/home/Hero";
import LatestPosts from "./components/home/LatestPosts";
import Skills from "./components/home/Skills";
import Work from "./components/home/Work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="route">
        <Work />
        <Skills />
        <About />
        <LatestPosts />
      </div>
      <Closing />
    </>
  );
}
