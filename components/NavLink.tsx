import Link from "next/link";
import type { NavItem } from "@/lib/site";

type NavLinkProps = {
  item: NavItem;
  /** e.g. the mobile drawer closes itself when a link is clicked */
  onClick?: () => void;
};

/**
 * Single nav link shared by the desktop sidebar and the mobile drawer.
 * One active indicator only: the small lime dash before the label — no
 * vertical bar. The dash slot keeps every label left-aligned to the same
 * edge as the sidebar's photo and header text.
 */
export function NavLink({ item, onClick }: NavLinkProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={item.active ? "page" : undefined}
      className={`
        group flex items-center gap-3 py-2 text-[1.0625rem] transition-colors duration-200
        ${
          item.active
            ? /* active: bold lime label + solid lime dash */
              "font-bold text-accent"
            : /* primary/70 ≈ #b3b3b3 on the dark bg — ~9.4:1 contrast (WCAG AAA) */
              "font-medium text-primary/70 hover:text-primary"
        }
      `}
    >
      {/* Lime dash — slot reserves its width so all labels line up */}
      <span
        aria-hidden="true"
        className={`h-[2px] w-4 shrink-0 rounded-full bg-accent transition-opacity duration-200 ${
          item.active ? "opacity-100" : "opacity-0"
        }`}
      />
      {item.label}
    </Link>
  );
}
