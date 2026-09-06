import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

import { FadeUp } from "@/components/FadeUp";
import { getTechIcon } from "@/lib/tech-icons";
import { Hero } from "@/components/Hero";
import { PillButton } from "@/components/PillButton";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TechMarquee } from "@/components/TechMarquee";
import {
  finalCta,
  heroContent,
  highlightedTech,
  projects,
  siteConfig,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const quickLinks = [
  {
    label: "About",
    href: "/about",
    description: "Learn about my background, skills and what I do.",
  },
  {
    label: "Projects",
    href: "/projects",
    description: "See the products, apps and systems I've built.",
  },
  {
    label: "Experience",
    href: "/experience",
    description: "My professional timeline and leadership programs.",
  },
  {
    label: "Achievements",
    href: "/achievements",
    description: "Certifications, awards and recognitions.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch for projects or collaboration.",
  },
  {
    label: "GitHub",
    href: siteConfig.githubUrl,
    description: "Explore my projects and open-source experiments.",
    external: true,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Intro / hero — the page's single <h1> lives inside */}
      <section
        id="intro"
        className="scroll-mt-24 px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-[8vh] lg:pr-20 lg:pt-[16vh]"
      >
        <Hero
          statusText="Available for projects"
          role={heroContent.role}
          headline={heroContent.headline}
          headlineShort={heroContent.headlineShort}
          email={siteConfig.email}
          githubUrl={siteConfig.githubUrl}
          instagramUrl={siteConfig.instagramUrl}
        />
      </section>

      {/* Mobile: static pills of the strongest technologies */}
      <div className="flex flex-wrap items-center justify-center gap-2 px-6 md:hidden">
        {highlightedTech.map((name) => {
          const Icon = getTechIcon(name);
          return (
            <span
              key={name}
              className="inline-flex items-center gap-2 rounded-pill border border-card-border bg-card px-3.5 py-1.5 text-sm font-medium text-primary/85"
            >
              {Icon && <Icon aria-hidden="true" className="size-4" />}
              {name}
            </span>
          );
        })}
      </div>

      {/* Tech marquee — muted auto-scrolling brand strip (md+ only) */}
      <div className="hidden md:block">
        <TechMarquee />
      </div>

      {/* Selected work — curated 3-project preview */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:pr-20">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionHeading large>Selected Work</SectionHeading>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                A selection of products, applications and systems I&apos;ve
                built.
              </p>
            </div>
            <Link
              href="/projects"
              className="group inline-flex min-h-[44px] items-center gap-2 pb-1 pt-2 text-sm font-medium text-primary/80 transition-colors duration-200 hover:text-accent"
            >
              View all projects
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </FadeUp>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <FadeUp key={project.title} delay={0.08 + i * 0.08}>
              <ProjectCard
                title={project.title}
                description={project.description}
                icon={project.icon}
                tech={project.tech}
                demoUrl={project.demoUrl}
                sourceUrl={project.sourceUrl}
                gallery={project.gallery ?? []}
                index={i}
              />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Quick links to sub-pages */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:pr-20">
        <FadeUp>
          <SectionHeading large>Explore</SectionHeading>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Learn more about me, my work and how to get in touch.
          </p>
        </FadeUp>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link, i) => (
            <FadeUp key={link.href} delay={0.08 + i * 0.06}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-card border border-card-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_40px_-12px_color-mix(in_srgb,var(--accent)_30%,transparent)] active:translate-y-0 active:scale-[0.995]"
                >
                  <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-accent">
                    {link.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {link.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Visit
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="group flex flex-col rounded-card border border-card-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_40px_-12px_color-mix(in_srgb,var(--accent)_30%,transparent)] active:translate-y-0 active:scale-[0.995]"
                >
                  <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-accent">
                    {link.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {link.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    View
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              )}
            </FadeUp>
          ))}
        </div>
      </section>

      {/* GitHub */}
      <section aria-label="GitHub" className="px-6 py-16 md:px-12 md:py-24 lg:pr-20">
        <FadeUp>
          <div className="rounded-card border border-card-border bg-card p-8 md:p-14">
            <h2 className="max-w-[35rem] font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">
              I build, experiment &amp; learn in public.
            </h2>
            <p className="mt-4 max-w-[27.5rem] text-sm leading-relaxed text-muted md:text-base">
              Explore my projects, experiments and open-source work on GitHub.
            </p>
            <PillButton
              variant="primary"
              href={siteConfig.githubUrl}
              className="mt-10"
            >
              View GitHub ↗
            </PillButton>
          </div>
        </FadeUp>
      </section>

      {/* Final CTA / contact */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:pr-20">
        <FadeUp>
          <h2 className="font-heading text-[2rem] font-medium uppercase leading-[1.05] text-primary md:text-[3.5rem]">
            {finalCta.headingLines[0]}
            <br />
            {finalCta.headingLines[1]}
          </h2>
          <p className="mt-6 max-w-[26.25rem] text-sm leading-relaxed text-muted md:text-base">
            {finalCta.description}
          </p>
          <PillButton variant="primary" href="/contact" className="mt-10">
            Get in touch ↗
          </PillButton>
          <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted">
            <MapPin aria-hidden="true" className="size-3.5" />
            Rwanda · Available for remote work
          </p>

          {/* Secondary socials */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
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
      </section>
    </>
  );
}
