import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";
import Hero from "@/components/Hero";

interface NieuwsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NieuwsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} - Nieuws - Stichting Kettingreactie`,
    description: `Lees dit nieuwsbericht van Stichting Kettingreactie.`,
  };
}

export default async function NieuwsDetailPage({
  params,
}: NieuwsDetailPageProps) {
  const { slug } = await params;

  return (
    <>
      <Hero title="Nieuws" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/nieuws"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar nieuws
          </Link>

          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <Newspaper className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Artikel: {slug}
              </h2>
              <p className="mt-3 text-gray-500">
                Dit nieuwsbericht wordt binnenkort via het CMS beschikbaar
                gesteld. Verbinding met Supabase wordt later geactiveerd.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
