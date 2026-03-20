import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category?: string;
}

export default function BlogPostCard({
  title,
  excerpt,
  slug,
  date,
  category,
}: BlogPostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/nieuws/${slug}`} className="group block cursor-pointer">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        {/* Gradient accent balk */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-accent-500" />

        <div className="flex flex-1 flex-col p-6">
          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {category && (
              <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                {category}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>

          {/* Titel */}
          <h3 className="mb-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
            {excerpt}
          </p>

          {/* CTA */}
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-all group-hover:gap-2 group-hover:text-primary-800">
            Lees verder
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
