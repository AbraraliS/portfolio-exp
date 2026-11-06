import { ReactNode } from "react";
import Reveal from "./Reveal";

/** A section heading sitting on the route line as a station. */
export default function Stop({
  title,
  intro,
}: {
  title: string;
  intro?: ReactNode;
}) {
  return (
    <Reveal as="header" className="stop">
      <span className="stop-marker" aria-hidden="true" />
      <h2 className="stop-title">{title}</h2>
      {intro && <p className="stop-intro">{intro}</p>}
    </Reveal>
  );
}
