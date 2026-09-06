import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeUp } from "@/components/FadeUp";
import { JsonLd } from "@/components/JsonLd";
import { PillButton } from "@/components/PillButton";
import { SectionHeading } from "@/components/SectionHeading";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { contactEmailHref, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — ${siteConfig.role} available for projects, freelance work and collaboration.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} — ${siteConfig.role} available for projects, freelance work and collaboration.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  const breadcrumb = buildBreadcrumbJsonLd("/contact");
  return (
    <>
      {breadcrumb && <JsonLd data={breadcrumb} />}
      <Breadcrumbs />
      <section className="px-6 py-16 md:px-12 md:py-24 lg:pr-20">
        <FadeUp>
          <SectionHeading large>Get in Touch</SectionHeading>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="mt-12 max-w-xl">
            <h2 className="font-heading text-[2rem] font-medium uppercase leading-[1.05] text-primary md:text-[3.5rem]">
              Have an idea?
              <br />
              Let&apos;s build it.
            </h2>
            <p className="mt-6 max-w-[26.25rem] text-sm leading-relaxed text-muted md:text-base">
              Have a project, business problem, or idea that could become
              software? I&apos;m available for freelance work, collaborations
              and consulting.
            </p>
            <PillButton variant="primary" href={contactEmailHref} className="mt-10">
              Send an Email ↗
            </PillButton>
            <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted">
              <MapPin aria-hidden="true" className="size-3.5" />
              Rwanda · Available for remote work
            </p>
            <p className="mt-3 text-xs text-muted">
              Email opens in your mail app with the subject filled in — I
              reply within a day or two.
            </p>
          </div>
        </FadeUp>

        {/* Secondary socials */}
        <FadeUp delay={0.16} className="mt-12">
          <div className="flex flex-wrap items-center gap-2.5">
            {[
              {
                label: "Chat on WhatsApp",
                href: siteConfig.whatsappUrl,
                Icon: FaWhatsapp,
              },
              {
                label: "Instagram profile",
                href: siteConfig.instagramUrl,
                Icon: FaInstagram,
              },
            ]
              .filter((s) => s.href)
              .map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-card-border bg-card px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                </a>
              ))}
          </div>
        </FadeUp>

        {/* Quick contact info */}
        <FadeUp delay={0.24} className="mt-16">
          <div className="rounded-card border border-card-border bg-card p-8 md:p-10">
            <h3 className="font-heading text-lg font-semibold text-primary">
              Other ways to reach me
            </h3>
            <dl className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <dt className="w-20 shrink-0 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Email
                </dt>
                <dd>
                  <a
                    href={contactEmailHref}
                    className="inline-flex min-h-[44px] items-center text-sm text-primary/80 transition-colors hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="w-20 shrink-0 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  GitHub
                </dt>
                <dd>
                  <a
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-sm text-primary/80 transition-colors hover:text-accent"
                  >
                    {siteConfig.githubUrl.replace("https://", "")}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="w-20 shrink-0 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Instagram
                </dt>
                <dd>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-sm text-primary/80 transition-colors hover:text-accent"
                  >
                    {siteConfig.instagramUrl.replace("https://", "")}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
