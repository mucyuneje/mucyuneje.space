import Image from "next/image";

type AvatarProps = {
  src: string;
  alt: string;
  /** Hint for the image loader (intrinsic px size) */
  size?: number;
  /** Sizing classes, e.g. "size-[4.75rem] size-20" */
  className?: string;
  /** Set on above-the-fold media (hero) so it loads eagerly */
  priority?: boolean;
};

/**
 * Circular profile photo — plain per the reference:
 * no border, ring, glow or filter; sits directly on the page background.
 */
export function Avatar({
  src,
  alt,
  size = 320,
  className = "size-20",
  priority = false,
}: AvatarProps) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        priority={priority}
        className="rounded-full object-cover"
      />
    </span>
  );
}
