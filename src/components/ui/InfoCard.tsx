import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

type InfoCardVariant = "default" | "highlight" | "muted";

interface InfoCardProps {
  icon?: ComponentType<LucideProps>;
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  variant?: InfoCardVariant;
  className?: string;
}

const variantStyles: Record<InfoCardVariant, string> = {
  default: "border border-line bg-white",
  highlight:
    "border border-accent-100 bg-gradient-to-br from-accent-50 via-white to-primary-50",
  muted: "border border-line bg-cream-dark/60",
};

export default function InfoCard({
  icon: Icon,
  eyebrow,
  title,
  children,
  variant = "default",
  className = "",
}: InfoCardProps) {
  return (
    <article
      className={`group rounded-3xl p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-10 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start gap-5">
        {Icon && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent-100 bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-600 group-hover:text-white">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {eyebrow && (
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              {eyebrow}
            </span>
          )}
          <h3 className="font-serif text-2xl font-bold leading-tight text-primary-600 sm:text-[1.75rem]">
            {title}
          </h3>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
