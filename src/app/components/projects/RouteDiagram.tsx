/** A real sequence of stages drawn as a line with stations. */
export default function RouteDiagram({
  stops,
  label,
}: {
  stops: string[];
  label: string;
}) {
  return (
    <div className="route-diagram">
      <ol aria-label={label}>
        {stops.map((stop) => (
          <li key={stop}>
            <span>{stop}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
