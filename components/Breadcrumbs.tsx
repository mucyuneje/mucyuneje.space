"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Human-readable labels for each route segment. */
const routeLabels: Record<string, string> = {
  about: "About",
  projects: "Projects",
  experience: "Experience",
  achievements: "Achievements",
  contact: "Contact",
};

/**
 * Breadcrumb navigation — renders "Home > [Page]" on sub-pages.
 * Google uses BreadcrumbList schema (injected via JSON-LD) together with
 * these visible links to display enhanced search result snippets.
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean)[0];

  if (!segment) return null;

  const label = routeLabels[segment] ?? segment;

  return (
    <nav aria-label="Breadcrumb" className="px-6 pt-10 pb-2 md:px-12 lg:pr-20">
      <ol className="flex items-center gap-2 text-sm text-muted">
        <li>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-200 hover:text-primary"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="select-none">/</li>
        <li aria-current="page" className="font-medium text-primary">
          {label}
        </li>
      </ol>
    </nav>
  );
}
