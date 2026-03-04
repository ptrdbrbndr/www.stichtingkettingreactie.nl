import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Nieuws - Stichting Kettingreactie",
  description:
    "Lees het laatste nieuws van Stichting Kettingreactie over onze projecten en activiteiten.",
};

export default function NieuwsPage() {
  return (
    <>
      <Hero
        title="Nieuws"
        subtitle="Blijf op de hoogte van onze projecten en activiteiten."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <Newspaper className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Binnenkort beschikbaar
            </h2>
            <p className="mt-3 text-gray-500">
              Binnenkort verschijnen hier onze nieuwsberichten via het CMS.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
