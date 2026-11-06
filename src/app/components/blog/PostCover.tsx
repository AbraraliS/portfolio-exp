import { Post } from "@/Types/types";

const WIDTH = 640;
const HEIGHT = 300;

/**
 * Each article's cover is its own route: a diagram of the stages it walks
 * through, drawn in the map's 45-degree language. The layout depends only on
 * the number of stops, so it renders the same on the server every time.
 */
export default function PostCover({ post }: { post: Post }) {
  const count = post.stops.length;
  const gap = (WIDTH - 120) / (count - 1);
  const stations = post.stops.map((stop, index) => ({
    stop,
    x: 60 + index * gap,
    y: index % 2 === 0 ? 95 : 205,
  }));

  // Runs level beside each station, with a 45-degree change between levels.
  let d = `M${stations[0].x} ${stations[0].y}`;
  stations.slice(1).forEach((station, index) => {
    const previous = stations[index];
    const rise = Math.abs(station.y - previous.y);
    const middle = (previous.x + station.x) / 2;
    d += `H${middle - rise / 2}L${middle + rise / 2} ${station.y}H${station.x}`;
  });

  return (
    <svg
      className="post-cover"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      aria-hidden="true"
    >
      <path className="post-cover-line" d={d} />
      {stations.map(({ stop, x, y }) => (
        <circle
          key={stop}
          className="post-cover-station"
          cx={x}
          cy={y}
          r={12}
        />
      ))}
    </svg>
  );
}
