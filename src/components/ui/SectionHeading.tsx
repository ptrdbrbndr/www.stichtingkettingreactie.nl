import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const Tag = as;
  const alignment = align === "center" ? "text-center" : "text-left";
  const titleClass =
    as === "h1"
      ? "font-serif text-4xl font-bold leading-tight text-primary-600 sm:text-5xl lg:text-6xl"
      : "font-serif text-4xl font-bold leading-tight text-primary-600 sm:text-5xl";
  const subtitleWrap =
    align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl";

  return (
    <div className={alignment}>
      {eyebrow && (
        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
          {eyebrow}
        </span>
      )}
      <Tag className={`${eyebrow ? "mt-3" : ""} ${titleClass}`}>{title}</Tag>
      {subtitle && (
        <p
          className={`mt-5 text-lg leading-relaxed text-ink-soft ${subtitleWrap}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
