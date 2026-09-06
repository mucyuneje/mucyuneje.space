"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  ACHIEVEMENT_CATEGORIES,
  type Achievement,
  type AchievementCategory,
} from "@/lib/achievements";
import { CertificateCard } from "@/components/achievements/CertificateCard";
import { CertificateModal } from "@/components/achievements/CertificateModal";
import { categoryIcons } from "@/components/achievements/category-icons";

type AchievementsExplorerProps = {
  achievements: Achievement[];
};

type Filter = "All" | AchievementCategory;

/** Group by year (desc); undated items fall into a trailing group. */
function groupByYear(achievements: Achievement[]) {
  const groups = new Map<string, Achievement[]>();
  for (const achievement of achievements) {
    const key = achievement.year ?? "";
    const bucket = groups.get(key);
    if (bucket) bucket.push(achievement);
    else groups.set(key, [achievement]);
  }
  return [...groups.entries()].sort(([a], [b]) => b.localeCompare(a));
}

/**
 * Full-collection browser on /achievements: elegant filters, compact
 * credential grid and a chronological growth timeline.
 */
export function AchievementsExplorer({ achievements }: AchievementsExplorerProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const [preview, setPreview] = useState<Achievement | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      filter === "All"
        ? achievements
        : achievements.filter(
            (achievement) => achievement.category === filter,
          ),
    [achievements, filter],
  );

  const yearGroups = useMemo(() => groupByYear(filtered), [filtered]);
  const hasDatedGroups = yearGroups.some(([year]) => year !== "");

  // Only offer filters that actually contain achievements — no dead ends
  const availableFilters: Filter[] = [
    "All",
    ...ACHIEVEMENT_CATEGORIES.filter((category) =>
      achievements.some((achievement) => achievement.category === category),
    ),
  ];

  return (
    <>
      {/* Filters — horizontally scrollable on mobile, never dashboard-y */}
      <div className="-mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0">
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {availableFilters.map((option) => {
            const active = filter === option;
            const Icon =
              option === "All" ? null : categoryIcons[option];
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={active}
                className={`inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-pill border px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                  active
                    ? "border-accent bg-accent text-black"
                    : "border-card-border bg-card text-muted hover:border-white/20 hover:text-primary"
                }`}
              >
                {Icon && <Icon aria-hidden="true" className="size-3.5" />}
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Credential grid — key on filter so FadeUp replays softly */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-card border border-card-border bg-card p-8 text-center">
          <p className="text-sm font-medium text-primary">No items in this category yet</p>
          <p className="mt-2 text-xs text-muted">
            New certifications and awards appear here as they are earned.
          </p>
        </div>
      ) : (
        <motion.div
          key={filter}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {filtered.map((achievement) => (
            <CertificateCard
              key={achievement.title}
              achievement={achievement}
              onPreview={setPreview}
            />
          ))}
        </motion.div>
      )}

      {/* Growth timeline — hidden while a filter has nothing to show */}
      {filtered.length > 0 && (
        <div className="mt-20">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Timeline
          </h3>
          <ol className="mt-8 space-y-10 border-l-2 border-card-border pl-8">
            {yearGroups.map(([year, items]) => (
              <li key={year || "undated"}>
                {(year || !hasDatedGroups) && (
                  <span className="font-heading text-lg font-bold text-primary">
                    {year || "Milestones"}
                  </span>
                )}
                <ul className="mt-4 space-y-4">
                  {items.map((achievement) => {
                    const Icon = categoryIcons[achievement.category];
                    return (
                      <li key={achievement.title} className="relative">
                        {/* node sits on the axis like the experience timeline */}
                        <span className="absolute -left-[calc(2rem+9px)] top-1 flex size-4 items-center justify-center rounded-full bg-bg ring-2 ring-accent/60">
                          <span className="size-1.5 rounded-full bg-accent" />
                        </span>
                        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                          <span className="font-semibold text-primary">
                            {achievement.title}
                          </span>
                          {achievement.result && (
                            <span className="text-xs font-bold text-accent">
                              {achievement.result}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs text-muted">
                            <Icon aria-hidden="true" className="size-3.5" />
                            {[achievement.organization, achievement.category]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      )}

      <CertificateModal achievement={preview} onClose={() => setPreview(null)} />
    </>
  );
}
