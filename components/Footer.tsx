import Link from "next/link";

import { siteConfig, socials } from "@/lib/site";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

/** Minimal footer: page links, name + role, social links, copyright. */
export function Footer() {
  return (
    <footer className="border-t border-card-border px-6 py-8 md:px-12 lg:pr-20">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.125rem] text-primary">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-xs text-muted">{siteConfig.role}</p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="inline-flex min-h-[44px] items-center px-2 text-xs uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                {...(social.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex min-h-[44px] items-center px-2 text-xs uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-primary"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted">© 2026 Arsene Mucyuneje</p>
      </div>
    </footer>
  );
}
