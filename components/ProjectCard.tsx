import { ArrowUpRight } from "lucide-react";

import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectThumb } from "@/components/ProjectThumb";
import { Tag } from "@/components/Tag";
import { siteConfig } from "@/lib/site";
import type { Project } from "@/lib/site";
import { getTechIcon } from "@/lib/tech-icons";

type ProjectCardProps = Project & {
  /** Stable position — used to pick the thumbnail's hue. */
  index?: number;
};

/**
 * Compact project card: browser-frame mockup thumbnail, title with a subtle
 * arrow indicator, a single concise description (clamped to 3 lines), and
 * one bottom row holding tech tags (left) and action links (right). Explicit
 * links — "Live Demo" (primary) and "Source Code" (secondary) — keep each
 * destination honest and separate; cards with no public URL yet show a
 * muted "coming soon" note instead of a dead link.
 * Hover: icon lifts inside the thumb, border eases toward the accent, arrow
 * nudges.
 */
export function ProjectCard({
  title,
  description,
  icon,
  tech,
  demoUrl,
  sourceUrl,
  gallery = [],
  index = 0,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-card-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_40px_-12px_color-mix(in_srgb,var(--accent)_30%,transparent)] active:translate-y-0 active:scale-[0.995]">
      {/* Media — deliberately wide and short to keep the card compact */}
      <ProjectThumb title={title} icon={icon} index={index} />

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
                <li key={t}>
                  <Tag icon={Icon ? <Icon className="size-3" /> : undefined}>
                    {t}
                  </Tag>
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
                  className="inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap py-1 text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
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
                  className="inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap py-1 text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
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
              className="inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap py-1 text-sm font-medium text-muted transition-colors duration-200 hover:text-primary"
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
