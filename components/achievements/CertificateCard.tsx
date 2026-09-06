import { ArrowUpRight } from "lucide-react";

import { Tag } from "@/components/Tag";
import type { Achievement } from "@/lib/achievements";
import { categoryIcons } from "@/components/achievements/category-icons";

type CertificateCardProps = {
  achievement: Achievement;
  /** Provided by the explorer — opens the certificate lightbox. */
  onPreview?: (achievement: Achievement) => void;
};

/**
 * Compact credential card: icon + title + org/year + tag pills + link.
 * Deliberately small — certificates support the story, they don't lead it.
 */
export function CertificateCard({
  achievement,
  onPreview,
}: CertificateCardProps) {
  const Icon = categoryIcons[achievement.category];
  const hasPreview = Boolean(achievement.certificateImage && onPreview);

  return (
    <div className="group flex h-full flex-col rounded-card border border-card-border bg-card p-5 transition-colors duration-200 hover:border-white/15">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-muted">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-base font-medium leading-snug text-primary">
            {hasPreview ? (
              <button
                type="button"
                onClick={() => onPreview?.(achievement)}
                className="inline-flex min-h-[44px] items-center -ml-1 pl-1 pr-1 text-left underline-offset-4 hover:underline"
              >
                {achievement.title}
              </button>
            ) : (
              achievement.title
            )}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted">
            {[achievement.organization, achievement.year]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </div>

      {(achievement.result || achievement.skills?.length) && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {[achievement.result, ...(achievement.skills ?? [])]
            .filter(Boolean)
            .map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
        </ul>
      )}

      {achievement.credentialUrl && (
        <a
          href={achievement.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex min-h-[44px] items-center gap-1 pt-4 text-xs font-semibold text-primary/80 transition-colors hover:text-accent"
        >
          View Credential
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </a>
      )}
    </div>
  );
}
