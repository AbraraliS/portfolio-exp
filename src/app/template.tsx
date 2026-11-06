/** Re-mounts on every route change, which plays the page transition in CSS. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
