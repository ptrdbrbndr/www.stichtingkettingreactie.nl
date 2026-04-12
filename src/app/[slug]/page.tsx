import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { getPageBySlug } from "@ptrdbrbndr/cms";

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const page = await getPageBySlug(supabase, slug);
  if (!page) {
    return { title: "Pagina niet gevonden - Stichting Kettingreactie" };
  }
  return {
    title:
      page.meta_title ?? `${page.title} - Stichting Kettingreactie`,
    description: page.meta_description ?? undefined,
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const page = await getPageBySlug(supabase, slug);

  if (!page || page.status !== "published") {
    notFound();
  }

  return (
    <>
      <Hero title={page.title} subtitle={page.subtitle ?? undefined} />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {page.content_html ? (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: page.content_html }}
            />
          ) : (
            <p className="text-gray-500">Deze pagina heeft nog geen inhoud.</p>
          )}
        </div>
      </section>
    </>
  );
}
