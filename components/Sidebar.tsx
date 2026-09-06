import Link from "next/link";

import { Avatar } from "@/components/Avatar";
import { NavLinks } from "@/components/NavLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { NavItem } from "@/lib/site";
import { profile, siteConfig } from "@/lib/site";

type SidebarProps = {
  items: NavItem[];
};

/**
 * Full-height left sidebar (desktop only, lg+): identity block on top with
 * the theme toggle aligned in the same row (avatar left, toggle right —
 * normal flow, never overlapping on any viewport), scroll-spy navigation in
 * the middle, handle at the bottom. Sticky inside the centered app shell;
 * below lg the MobileNav drawer takes over.
 */
export function Sidebar({ items }: SidebarProps) {
  const handle = `@${siteConfig.githubUrl.split("/").pop()}`;

  return (
    <aside className="sticky top-0 hidden h-dvh w-[17.5rem] shrink-0 flex-col bg-bg px-10 py-10 lg:flex">
      {/* Identity row — avatar/name share the left edge, theme toggle sits
          cleanly opposite the avatar instead of floating over the image */}
      <div className="flex items-start justify-between gap-4">
        <Link href="/" className="block">
          <Avatar
            src={profile.avatar}
            alt={profile.avatarAlt}
            size={152}
            priority
            className="size-[5.5rem]"
          />
          <span className="mt-6 block font-heading text-[1.4375rem] font-bold leading-tight tracking-tight text-primary">
            Mucyuneje Hirwa Arsene
          </span>
          <span className="mt-3 block text-base font-normal leading-relaxed text-muted">
            Software Developer &amp; IT Consultant
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Scroll-spy navigation — generous spacing, accent bar on the active item */}
      <nav aria-label="Primary" className="mt-14 flex-1">
        <NavLinks items={items} ulClassName="flex flex-col gap-8" />
      </nav>

      {/* Bottom: handle only — social links live in the hero */}
      <p className="mt-6 text-[0.8125rem] text-muted">{handle}</p>
    </aside>
  );
}
