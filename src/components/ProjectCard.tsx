import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export default function ProjectCard({
  title,
  description,
  href,
  icon,
}: ProjectCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Pink top border accent */}
        <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-700" />

        <div className="p-6">
          {icon && (
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-100">
              {icon}
            </div>
          )}

          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-700">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-gray-600">
            {description}
          </p>

          <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-700 transition-colors group-hover:text-primary-800">
            Lees meer
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
