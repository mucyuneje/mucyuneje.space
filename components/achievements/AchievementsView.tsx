"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { Achievement } from "@/lib/achievements";
import { AchievementsExplorer } from "@/components/achievements/AchievementsExplorer";
import { CertificateCard } from "@/components/achievements/CertificateCard";

type AchievementsViewProps = {
  /** Curated homepage edit — strongest credentials only. */
  highlights: Achievement[];
  /** Full collection — filters + grid + timeline. */
  all: Achievement[];
};

type View = "highlights" | "all";

/**
 * Homepage toggle between the tight curated edit and the complete
 * achievements collection (filters, timeline, previews) — one section,
 * no separate route.
 */
export function AchievementsView({ highlights, all }: AchievementsViewProps) {
  const [view, setView] = useState<View>("highlights");
  const reduceMotion = useReducedMotion();

  return (
    <div>
      {/* Segmented toggle — same pill language as the category filters */}
      <div className="inline-flex rounded-pill border border-card-border bg-card p-1">
        {(
          [
            ["highlights", "Highlights"],
            ["all", "All achievements"],
          ] as [View, string][]
        ).map(([value, label]) => {
          const active = view === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setView(value)}
              aria-pressed={active}
              className={`inline-flex min-h-[44px] items-center rounded-pill px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                active
                  ? "bg-accent text-black"
                  : "text-muted hover:text-primary"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {view === "highlights" ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((achievement) => (
                <li key={achievement.title}>
                  <CertificateCard achievement={achievement} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10">
              <AchievementsExplorer achievements={all} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
