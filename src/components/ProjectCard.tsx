import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

export default function ProjectCard({
  title,
  description,
  href,
  icon,
  image,
  imageAlt,
}: ProjectCardProps) {
  return (
    <Link href={href} className="group block cursor-pointer">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        {image ? (
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradient overlay onderaan foto */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ) : (
          <div className="h-1.5 bg-gradient-to-r from-primary-500 to-accent-500" />
        )}

        <div className="flex flex-1 flex-col p-6">
          {icon && !image && (
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-100">
              {icon}
            </div>
          )}

          <h3 className="mb-2 font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
            {title}
          </h3>

          <p className="flex-1 text-sm leading-relaxed text-gray-500">
            {description}
          </p>

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-all group-hover:gap-2 group-hover:text-primary-800">
            Lees meer
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
