import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  /** Optional leading icon (e.g. a tech brand icon) — rendered inline */
  icon?: ReactNode;
  /** "muted" for neutral stack/skill tags, "accent" for role tags */
  variant?: "muted" | "accent";
  className?: string;
};

/** Unified pill tag — one set of padding, size, border and background so
 *  stack tags, skill tags and role tags read as a single system across
 *  pages. Use a real <button> for things that need click behavior. */
export function Tag({ children, icon, variant = "muted", className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill border border-card-border px-2.5 py-1 text-xs font-medium tracking-wide ${
        variant === "accent" ? "bg-card text-accent" : "bg-card text-muted"
      } ${className}`}
    >
      {icon && <span aria-hidden="true" className="flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}