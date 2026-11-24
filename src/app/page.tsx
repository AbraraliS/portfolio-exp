import type { Metadata } from "next";
import Folio from "./components/home/Folio";

/** The Live now section refreshes its data at most every 10 minutes. */
export const revalidate = 600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <Folio />;
}
