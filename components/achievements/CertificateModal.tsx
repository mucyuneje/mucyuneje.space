"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import type { Achievement } from "@/lib/achievements";

type CertificateModalProps = {
  achievement: Achievement | null;
  onClose: () => void;
};

/**
 * Polished lightbox for certificate previews. Opens only for achievements
 * that actually ship a certificateImage; Esc / backdrop click to dismiss.
 */
export function CertificateModal({ achievement, onClose }: CertificateModalProps) {
  const reduceMotion = useReducedMotion();

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!achievement) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={achievement.title}
        >
          <motion.div
            className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-card border border-card-border bg-card"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-card-border bg-bg-secondary p-2 text-muted transition-colors hover:text-primary"
            >
              <X aria-hidden="true" className="size-4" />
            </button>

            {/* Preview kept modest — lazy-loaded via next/image */}
            {achievement.certificateImage && (
              <div className="relative aspect-[4/3] w-full shrink-0 bg-bg-secondary">
                <Image
                  src={achievement.certificateImage}
                  alt={`Certificate — ${achievement.title}`}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-contain p-4"
                />
              </div>
            )}

            <div className="overflow-y-auto thin-scrollbar p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {[achievement.category, achievement.year]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <h3 className="mt-2 font-heading text-xl font-bold text-primary md:text-2xl">
                {achievement.title}
              </h3>
              {achievement.organization && (
                <p className="mt-1 text-sm text-muted">
                  {achievement.organization}
                </p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {achievement.description}
              </p>
              {achievement.credentialUrl && (
                <a
                  href={achievement.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold text-primary/80 transition-colors hover:text-accent"
                >
                  Verify Credential
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
