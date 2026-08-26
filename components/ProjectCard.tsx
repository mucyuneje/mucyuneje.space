import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { ProjectGallery } from "@/components/ProjectGallery";
import { siteConfig } from "@/lib/site";
import type { Project } from "@/lib/site";
import { getTechIcon } from "@/lib/tech-icons";

type ProjectCardProps = Project;

/**
 * Compact project card: short wide preview image, title with a subtle arrow
 * indicator, a single concise description (clamped to 3 lines), and one
 * bottom row holding tech tags (left) and action links (right). Explicit
 * links — "Live Demo" (primary) and "Source Code" (secondary) — keep each
 * destination honest and separate; cards with no public URL yet show a
 * muted "coming soon" note instead of a dead link.
 * Hover: image scales ~1.03, border eases toward the accent, arrow nudges.
 */
export function ProjectCard({
  title,
  description,
  image,
  tech,
  demoUrl,
  sourceUrl,
  gallery = [],
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-card-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_40px_-12px_color-mix(in_srgb,var(--accent)_30%,transparent)]">
      {/* Media — deliberately wide and short to keep the card compact */}
      <div className="relative aspect-[2/1] overflow-hidden">
        <Image
          src={image}
          alt={`${title} — project preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Screenshot strip — renders nothing until gallery assets are added */}
      <ProjectGallery title={title} images={gallery} />

      {/* Body — tight padding for a smaller overall footprint */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-medium text-primary">
            {title}
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>

        {/* One clean description — no structured labels, capped at 3 lines */}
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">
          {description}
        </p>

        {/* Bottom row: tech tags left, explicit links right — one line */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <ul
            className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5"
            aria-label="Tech stack"
          >
            {tech.map((t) => {
              const Icon = getTechIcon(t);
              return (
                <li
                  key={t}
                  className="inline-flex shrink-0 items-center gap-1 rounded-pill border border-card-border bg-bg-secondary px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide text-muted"
                >
                  {Icon && <Icon aria-hidden="true" className="size-3" />}
                  {t}
                </li>
              );
            })}
          </ul>

          {/* Distinct destinations: live deployment vs source code */}
          {demoUrl || sourceUrl ? (
            <div className="flex shrink-0 items-center gap-3">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 whitespace-nowrap text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
                >
                  Live Demo
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              )}
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 whitespace-nowrap text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
                >
                  Source Code
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              )}
            </div>
          ) : (
            /* No public URL yet — link to GitHub profile */
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 whitespace-nowrap text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
            >
              Visit GitHub
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
