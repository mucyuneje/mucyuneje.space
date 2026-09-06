import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeUp } from "@/components/FadeUp";
import { JsonLd } from "@/components/JsonLd";
import { PillButton } from "@/components/PillButton";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { projects, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore projects built by ${siteConfig.name} — full-stack web applications, AI systems, real-time tracking platforms and digital products.`,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: `Explore projects built by ${siteConfig.name} — full-stack web applications, AI systems, real-time tracking platforms and digital products.`,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  const breadcrumb = buildBreadcrumbJsonLd("/projects");
  return (
    <>
      {breadcrumb && <JsonLd data={breadcrumb} />}
      <Breadcrumbs />
      <section className="px-6 py-16 md:px-12 md:py-24 lg:pr-20">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionHeading large>Projects</SectionHeading>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                A selection of products, applications and systems I&apos;ve
                built.
              </p>
            </div>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center gap-2 pb-1 pt-2 text-sm font-medium text-primary/80 transition-colors duration-200 hover:text-accent"
            >
              View more on GitHub
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
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

        {/* GitHub CTA */}
        <FadeUp delay={0.4} className="mt-16">
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
    </>
  );
}
