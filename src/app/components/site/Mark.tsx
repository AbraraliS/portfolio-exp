/**
 * The Keystone A (2026-11-24): an open A with no crossbar; a red keystone sits where the bar would
 * be. The icon files come from the same drawing: node scripts/make-icons.mjs
 */
export default function Mark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="6 4 52 56"
      fill="none"
      aria-hidden="true"
      className="mark"
    >
      <path
        d="M12 54C21 39 28 24 32 9C36 24 43 39 52 54"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 33 37 40 32 47 27 40Z" fill="#ef4444" />
    </svg>
  );
}
