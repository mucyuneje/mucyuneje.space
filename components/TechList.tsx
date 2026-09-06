import { getTechIcon } from "@/lib/tech-icons";
import { Tag } from "@/components/Tag";

type TechListProps = {
  items: string[];
  /** "md" for the stack section, "sm" for project cards */
  size?: "sm" | "md";
  className?: string;
};

/** Renders tech names with their brand icons as uniform pill tags that
 *  wrap cleanly on any viewport width. */
export function TechList({ items, size = "md", className = "" }: TechListProps) {
  const iconSize = size === "sm" ? "size-3" : "size-4";
  const label =
    size === "sm" ? "text-xs uppercase tracking-[0.14em]" : "text-sm";

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => {
        const Icon = getTechIcon(item);
        return (
          <li key={item}>
            <Tag
              icon={Icon ? <Icon className={iconSize} /> : undefined}
              className={size === "sm" ? "px-3.5 py-1.5" : undefined}
            >
              <span className={label}>{item}</span>
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}