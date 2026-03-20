import Link from "next/link";

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
    <Link href={`/nieuws/${slug}`} className="group block">
      <article className="h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="p-6">
          {/* Date badge and category */}
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              {formattedDate}
            </span>
            {category && (
              <span className="inline-flex items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
                {category}
              </span>
            )}
          </div>

          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-700">
            {title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {excerpt}
          </p>

          <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-700 transition-colors group-hover:text-primary-800">
            Lees verder
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
