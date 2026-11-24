import type { Metadata } from "next";
import { personalData } from "@/../utils/Data/PersonalData";
import { projectName, projectsInOrder } from "@/../utils/project-helpers";
import Cinema from "./components/cinema/Cinema";
import Folio from "./components/home/Folio";

/** The Live now section refreshes its data at most every 10 minutes. */
export const revalidate = 600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SHOWN = ["crizo-app", "crizavoise"];

export default function Home() {
  const gallery = projectsInOrder()
    .filter((p) => !SHOWN.includes(String(p.id)) && p.thumbnail)
    .slice(0, 8)
    .map((p) => ({
      id: String(p.id),
      name: projectName(p),
      category: p.category,
      image: p.thumbnail,
      year: (p.date ?? p.year ?? "").slice(0, 4),
    }));
  return (
    <>
      <Cinema gallery={gallery} email={personalData.email} />
      <Folio />
    </>
  );
}
