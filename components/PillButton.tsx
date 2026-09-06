import Link from "next/link";
import type { ReactNode } from "react";

type PillButtonProps = {
  variant: "primary" | "secondary";
  href: string;
  children: ReactNode;
  className?: string;
};

const baseStyles =
  "inline-flex min-h-[44px] items-center justify-center rounded-pill px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98]";

const variantStyles = {
  /** Solid lime with a soft glow — pure black text for WCAG AAA contrast */
  primary:
    "bg-accent text-black shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_25%,transparent)] hover:shadow-[0_0_36px_color-mix(in_srgb,var(--accent)_40%,transparent)] hover:brightness-90",
  /** Neutral outline that picks up the accent on hover */
  secondary:
    "border border-white/25 bg-transparent text-primary hover:border-accent hover:text-accent",
} as const;

/** Pill-shaped CTA rendered as a real link. */
export function PillButton({
  variant,
  href,
  children,
  className = "",
}: PillButtonProps) {
  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
