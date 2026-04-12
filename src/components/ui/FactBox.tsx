import type { ReactNode } from "react";

interface FactBoxProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  mono?: boolean;
}

export default function FactBox({
  label,
  value,
  hint,
  mono = false,
}: FactBoxProps) {
  return (
    <div className="rounded-2xl border border-line bg-cream-dark/60 p-6 sm:p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-600">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-bold text-primary-600 sm:text-3xl ${
          mono ? "font-mono tracking-wider" : "font-serif"
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-2 text-sm text-ink-soft">{hint}</p>}
    </div>
  );
}
