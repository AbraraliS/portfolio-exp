/** The AS monogram, drawn as a route with its two terminal stations. */
export default function Mark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="mark"
    >
      <g
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d="M6 58 13 51V27L29 7V52" />
        <path d="M13 38H29" />
        <path d="M58 9 49 18H41L37 22V30L41 34H50L54 38V46L49 51H36" />
      </g>
      <circle cx="6" cy="58" r="5" fill="var(--signal)" />
      <circle cx="58" cy="9" r="5" fill="var(--signal)" />
    </svg>
  );
}
