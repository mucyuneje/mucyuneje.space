/* ---------------------------------------------------------------------------
 * JSON-LD structured data builder
 * Produces a single @graph with linked entities:
 *   Person                — who Arsene is (identity for the knowledge panel)
 *   WebSite               — the site entity, publisher-linked to the Person
 *   SiteNavigationElement — named section links; explicit hierarchy signals
 *                           that assist Google Sitelinks generation
 * Pure data module: no React, trivially unit-testable.
 * ------------------------------------------------------------------------- */

import { profile, seoKeywords, siteConfig } from "@/lib/site";
import type { NavItem } from "@/lib/site";

type BuildJsonLdArgs = {
  /** Nav items passed in so the graph always mirrors the rendered menu */
  navItems: NavItem[];
};

export function buildJsonLd({ navItems }: BuildJsonLdArgs) {
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        alternateName: "Arsene Mucyuneje Hirwa",
        jobTitle: siteConfig.role,
        description: siteConfig.description,
        url: siteConfig.url,
        email: `mailto:${siteConfig.email}`,
        image: `${siteConfig.url}${profile.avatar}`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "RW",
        },
        sameAs: [
          siteConfig.githubUrl,
          siteConfig.instagramUrl,
        ],
        knowsAbout: seoKeywords,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: { "@id": personId },
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteConfig.url}/#navigation`,
        name: "Primary navigation",
        itemListElement: navItems.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          url: `${siteConfig.url}${item.href}`,
        })),
      },
    ],
  };
}

/* ---------------------------------------------------------------------------
 * BreadcrumbList JSON-LD — rendered on sub-pages so Google displays
 * enhanced search result snippets with breadcrumb trails.
 * ------------------------------------------------------------------------- */

const pageLabels: Record<string, string> = {
  about: "About",
  projects: "Projects",
  experience: "Experience",
  achievements: "Achievements",
  contact: "Contact",
};

export function buildBreadcrumbJsonLd(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return null;

  const pageName = pageLabels[segment] ?? segment;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `${siteConfig.url}${pathname}`,
      },
    ],
  };
}
