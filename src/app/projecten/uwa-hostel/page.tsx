import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building, ShieldCheck, GraduationCap } from "lucide-react";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "UWA Working Women's Hostel - Stichting Kettingreactie",
  description:
    "Het Working Women's Hostel biedt veilige huisvesting aan jonge werkende vrouwen uit landelijke gebieden in Bangalore.",
};

export default function UwaHostelPage() {
  return (
    <>
      <Hero title="UWA – Working Women's Hostel" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/projecten"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar projecten
          </Link>

          <div className="mx-auto max-w-3xl">
            {/* Introductie */}
            <div className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
                <Building className="h-4 w-4" />
                Huisvesting &amp; Veiligheid
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Een veilig thuis voor werkende vrouwen
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Het Working Women&apos;s Hostel biedt huisvesting aan jonge
                werkende vrouwen die vanuit landelijke gebieden naar Bangalore
                komen om te werken. Voor veel van deze vrouwen is het de
                eerste keer dat zij hun dorp verlaten en op eigen benen staan
                in de grote stad.
              </p>
            </div>

            {/* UWA Bangalore */}
            <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    University Women&apos;s Association Bangalore
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Het hostel wordt gerund door de University Women&apos;s
                    Association (UWA) Bangalore. De UWA is een organisatie
                    die zich al jarenlang inzet voor de emancipatie en het
                    welzijn van vrouwen in de regio Bangalore.
                  </p>
                </div>
              </div>
            </div>

            {/* Veilige Omgeving */}
            <div className="mb-12">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Veilige omgeving
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Het hostel biedt een veilige en betaalbare omgeving voor
                    vrouwen om te wonen terwijl zij werken. In een stad als
                    Bangalore is betaalbare en veilige huisvesting voor
                    alleenstaande jonge vrouwen moeilijk te vinden. Het
                    hostel biedt deze vrouwen de mogelijkheid om zelfstandig
                    te worden en zich te ontwikkelen, zonder zich zorgen te
                    hoeven maken over hun veiligheid.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-8">
              <h3 className="text-xl font-semibold text-gray-900">
                Impact
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Dankzij het hostel kunnen jonge vrouwen vanuit het platteland
                in Bangalore werken en een eigen inkomen verdienen. Dit draagt
                bij aan hun zelfstandigheid en economische onafhankelijkheid.
                Veel van deze vrouwen ondersteunen op hun beurt weer hun
                families op het platteland.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
