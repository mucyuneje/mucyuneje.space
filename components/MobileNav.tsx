"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/site";
import { heroContent } from "@/lib/site";
import { NavLinks } from "@/components/NavLinks";

type MobileNavProps = {
  items: NavItem[];
};

/**
 * Mobile navigation: hamburger button (below the `lg` breakpoint) that opens
 * a full-screen slide-in drawer with the same nav items and 44px+ touch
 * targets. Closes on link click, Escape key, or backdrop tap. Focus moves
 * into the drawer while it is open and returns to the trigger on close.
 */
export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label="Open navigation menu"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      <AnimatePresence
        onExitComplete={() => triggerRef.current?.focus()}
      >
        {open && (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-sm"
            initial={reduceMotion ? false : { opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Drawer header mirrors the fixed page header: name left, close right */}
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-heading text-[0.9375rem] font-bold tracking-tight text-primary">
                {heroContent.identity}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                aria-label="Close navigation menu"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="px-8 pt-[8vh]">
              {/* min-h-12 = 48px minimum touch target */}
              <NavLinks
                items={items}
                ulClassName="flex flex-col gap-1"
                liClassName="flex min-h-12 items-center"
                onNavigate={close}
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}