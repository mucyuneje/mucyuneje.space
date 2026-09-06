import { ArrowUpRight, Trophy } from "lucide-react";

import { Tag } from "@/components/Tag";
import type { Achievement } from "@/lib/achievements";

type FeaturedAchievementProps = {
  achievement: Achievement;
};

/**
 * Tier-1 recognition gets the prominent treatment: result badge up top,
 * large title, short story line and skill pills — one per homepage.
 */
export function FeaturedAchievement({ achievement }: FeaturedAchievementProps) {
  return (
    <div className="rounded-card border border-card-border bg-card p-7 md:p-9">
      <div className="flex flex-wrap items-center gap-3">
        {achievement.result && (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-accent px-3 py-1 text-xs font-bold text-black">
            <Trophy aria-hidden="true" className="size-3.5" />
            {achievement.result}
          </span>
        )}
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {[achievement.category, achievement.year].filter(Boolean).join(" · ")}
        </span>
      </div>

      <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight text-primary md:text-[1.75rem]">
        {achievement.title}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        {achievement.description}
      </p>

      {(achievement.skills?.length || achievement.credentialUrl) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          {achievement.skills?.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {achievement.skills.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
          {achievement.credentialUrl && (
            <a
              href={achievement.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold text-primary/80 transition-colors hover:text-accent"
            >
              View Achievement
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
