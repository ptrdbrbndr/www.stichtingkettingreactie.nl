import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface FeaturedArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category?: string;
  image?: string | null;
}

export default function FeaturedArticleCard({
  title,
  excerpt,
  slug,
  date,
  category,
  image,
}: FeaturedArticleCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/nieuws/${slug}`} className="group block">
      <article className="grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-50 lg:aspect-auto">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500 to-accent-600 text-white">
              <span className="text-sm font-medium uppercase tracking-wider">
                Stichting Kettingreactie
              </span>
            </div>
          )}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700 shadow-sm backdrop-blur">
              Uitgelicht
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {category && (
              <span className="inline-flex items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
                {category}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
          </div>

          <h3 className="text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary-700 sm:text-3xl">
            {title}
          </h3>

          {excerpt && (
            <p className="mt-4 line-clamp-4 text-base leading-relaxed text-gray-600">
              {excerpt}
            </p>
          )}

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors group-hover:text-primary-800">
            Lees het hele artikel
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}
