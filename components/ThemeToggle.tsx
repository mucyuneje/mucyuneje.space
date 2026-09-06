"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Fixed top-right theme toggle. Flips a `.light` class on <html>, which
 * remaps the design tokens in globals.css; choice persists in localStorage
 * (applied pre-paint by an inline script in layout.tsx). Icon swap is pure
 * CSS so there is no mounted/hydration state to manage.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    // Transient class enables the smooth color crossfade in globals.css;
    // removed after the transition so hover/motion transitions stay snappy.
    root.classList.add("theme-transition");
    const isLight = root.classList.toggle("light");
    try {
      window.localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch {
      /* storage unavailable — theme simply won't persist */
    }
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-primary transition-colors duration-200 hover:text-accent"
    >
      {/* Sun shows in dark mode, Moon in light mode */}
      <Sun aria-hidden="true" className="size-5 [html.light_&]:hidden" />
      <Moon aria-hidden="true" className="hidden size-5 [html.light_&]:block" />
    </button>
  );
}
