import { Quote } from "lucide-react";

interface QuoteBlockProps {
  quote: string;
  author?: string;
  role?: string;
  variant?: "band" | "inline";
}

export default function QuoteBlock({
  quote,
  author,
  role,
  variant = "band",
}: QuoteBlockProps) {
  if (variant === "inline") {
    return (
      <blockquote className="rounded-2xl border-l-8 border-accent-600 bg-white p-8 shadow-lg">
        <Quote
          className="mb-3 h-6 w-6 text-accent-600"
          aria-hidden="true"
        />
        <p className="font-serif text-lg italic leading-relaxed text-primary-600">
          &ldquo;{quote}&rdquo;
        </p>
        {(author || role) && (
          <footer className="mt-4 not-italic">
            {author && (
              <p className="font-serif text-base font-bold text-primary-600">
                {author}
              </p>
            )}
            {role && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                {role}
              </p>
            )}
          </footer>
        )}
      </blockquote>
    );
  }

  return (
    <section className="relative overflow-hidden bg-cream-dark/50 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 text-primary-600 opacity-[0.04]"
      >
        <svg width="520" height="520" viewBox="0 0 100 100">
          <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="60" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="50" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Quote
          className="mx-auto mb-8 h-12 w-12 text-accent-600/30"
          aria-hidden="true"
        />
        <blockquote className="font-serif text-2xl font-medium leading-relaxed text-primary-600 sm:text-3xl md:text-4xl">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {(author || role) && (
          <div className="mt-10 not-italic">
            {author && (
              <p className="font-serif text-xl font-bold text-primary-600">
                {author}
              </p>
            )}
            {role && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                {role}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
