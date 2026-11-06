/** Primary navigation. `section` marks a home page section for the current-item highlight. */
export const navItems = [
  { label: "Work", href: "/#work", section: "work" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const isCurrent = (
  href: string,
  pathname: string,
  section: string | null,
) => {
  if (href.startsWith("/#")) {
    if (pathname === "/") return section === href.slice(2);
    return href === "/#work" && pathname.startsWith("/projects");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};
