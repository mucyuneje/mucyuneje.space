import { Mail } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";

import { FadeUp } from "@/components/FadeUp";
import { PillButton } from "@/components/PillButton";
import { StatusBadge } from "@/components/StatusBadge";

type HeroProps = {
  /** Availability pill shown above the headline */
  statusText: string;
  /** Role + base line — rendered as a bold kicker */
  role: string;
  headline: string;
  /** Shorter headline variant shown below the md breakpoint */
  headlineShort: string;
  /** Direct contact target for the primary CTA */
  email: string;
  /** Top professional channels — icon pills under the CTAs */
  githubUrl: string;
  instagramUrl: string;
};

/**
 * Hero: availability pill -> role kicker -> full-width headline ->
 * primary CTA pair ("Get in Touch" / "View Work") -> subtle pills for the
 * top three channels (GitHub, Instagram, Email).
 * Server component; only the FadeUp wrappers are client-side.
 */
export function Hero({
  statusText,
  role,
  headline,
  headlineShort,
  email,
  githubUrl,
  instagramUrl,
}: HeroProps) {
  /* Subtle background pills — quiet by default, lift on hover */
  const socialLinkClass =
    "inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-primary";
  const socials = [
    { label: "GitHub", href: githubUrl, Icon: SiGithub },
    { label: "Instagram", href: instagramUrl, Icon: SiInstagram },
    {
      label: "Email",
      href: email ? `mailto:${email}` : "",
      Icon: Mail,
    },
  ].filter((s) => s.href);

  return (
    <div>
      {/* Availability pill — green pulsing dot builds immediate trust */}
      <FadeUp>
        <StatusBadge text={statusText} />
      </FadeUp>

      {/* Role kicker — neutral muted gray; lime is reserved for the CTA */}
      <FadeUp delay={0.08}>
        <p className="mb-4 mt-6 block text-base font-bold uppercase tracking-wider text-muted sm:text-lg">
          {role}
        </p>
      </FadeUp>

      {/* Primary headline — the page's single h1. Short variant on mobile
          so it never runs past ~3 lines; full statement from md up.
          No max-width: text spans the full content column. */}
      <FadeUp delay={0.14}>
        <h1 className="mb-8 text-[clamp(2.25rem,8vw,2.6rem)] font-bold leading-[1.02] tracking-tight text-primary sm:text-4xl sm:leading-[1.1] md:text-[2.6rem] md:leading-[1.1] lg:text-[4.5rem] lg:leading-[1.05]">
          <span className="md:hidden">{headlineShort}</span>
          <span className="hidden md:inline">{headline}</span>
        </h1>
      </FadeUp>

      {/* Primary CTA pair — visitors never have to scroll or guess */}
      <FadeUp delay={0.2}>
        <div className="flex flex-wrap items-center gap-3">
          <PillButton
            variant="primary"
            href={email ? `mailto:${email}` : "/contact"}
          >
            Get in Touch
          </PillButton>
          <PillButton variant="secondary" href="/projects">
            View Work
          </PillButton>
        </div>
      </FadeUp>

      {/* Top three channels as subtle background pills */}
      <FadeUp delay={0.26}>
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={socialLinkClass}
            >
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </a>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}
