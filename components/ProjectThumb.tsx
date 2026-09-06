import type { LucideIcon } from "lucide-react";

/**
 * Browser-frame project mockup rendered in place of screenshot assets.
 * A slim browser chrome (window dots + URL bar) over a per-project hue
 * gradient with the project's brand icon — so cards stay visually
 * distinct instead of identical dark rectangles. Translucent hues and the
 * theme-aware accent token keep it working in both light and dark mode.
 */

const PALETTES = [
  "from-lime-400/25 via-emerald-500/10 to-cyan-500/5",
  "from-sky-400/25 via-blue-500/10 to-indigo-500/5",
  "from-violet-400/25 via-fuchsia-500/10 to-purple-500/5",
  "from-amber-300/25 via-orange-500/10 to-rose-500/5",
  "from-cyan-300/25 via-teal-500/10 to-emerald-500/5",
  "from-rose-400/25 via-red-500/10 to-orange-500/5",
  "from-accent/25 via-lime-300/10 to-transparent",
  "from-indigo-400/25 via-sky-500/10 to-cyan-500/5",
] as const;

type ProjectThumbProps = {
  title: string;
  icon: LucideIcon;
  /** Stable index so each project keeps the same hue across pages. */
  index?: number;
};

export function ProjectThumb({ title, icon: Icon, index = 0 }: ProjectThumbProps) {
  const gradient = PALETTES[index % PALETTES.length];

  return (
    <div className="relative aspect-[2/1] overflow-hidden bg-bg-secondary">
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 flex h-7 items-center gap-1.5 border-b border-card-border bg-bg px-3">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 h-3 flex-1 rounded-full bg-white/5" />
      </div>

      {/* Per-project hue wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

      {/* Brand icon — drops slightly below the chrome, quiet by default */}
      <div className="absolute inset-0 flex items-center justify-center pt-7">
        <Icon
          aria-hidden="true"
          className="size-14 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
        />
      </div>

      <span className="sr-only">{title}</span>
    </div>
  );
}