import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Stethoscope,
  Baby,
  Activity,
} from "lucide-react";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "ASHA Foundation - Stichting Kettingreactie",
  description:
    "De ASHA Foundation richt zich op HIV-preventie en behandeling voor vrouwen in India, geleid door Dr. Glory Alexander.",
};

export default function AshaFoundationPage() {
  return (
    <>
      <Hero title="ASHA Foundation" />

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
                <Shield className="h-4 w-4" />
                HIV-preventie &amp; Behandeling
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Medische zorg en preventie voor vrouwen
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                De ASHA Foundation wordt geleid door Dr. Glory Alexander en
                richt zich op HIV-preventie en behandeling voor vrouwen in
                en rondom Bangalore. De organisatie biedt levensreddende
                medische zorg aan vrouwen die anders geen toegang hebben tot
                behandeling.
              </p>
            </div>

            {/* ART Medicatie */}
            <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    ART-medicatie
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    De ASHA Foundation voorziet in antiretrovirale therapie
                    (ART-medicatie) voor circa 100 vrouwen. Dit betreft
                    voornamelijk weduwen en jonge HIV-positieve vrouwen die
                    zonder deze medicatie geen toegang zouden hebben tot
                    behandeling. De medicatie zorgt ervoor dat het virus
                    onder controle blijft en de vrouwen een waardig leven
                    kunnen leiden.
                  </p>
                </div>
              </div>
            </div>

            {/* PMTCT Programma */}
            <div className="mb-12">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <Baby className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    PMTCT-programma
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Een belangrijk onderdeel van het werk van de ASHA
                    Foundation is het PMTCT-programma (Prevention of
                    Mother-to-Child Transmission). Dit programma richt zich
                    op het voorkomen van moeder-kind-overdracht van HIV. Door
                    zwangere vrouwen te testen en te behandelen, kan
                    overdracht van het virus op de baby worden voorkomen.
                  </p>
                </div>
              </div>
            </div>

            {/* Cijfers */}
            <div className="mb-12 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary-700">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Impact in cijfers
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    In het kader van het PMTCT-programma kunnen circa 5.000
                    zwangere vrouwen worden getest in een periode van zes
                    maanden. Ongeveer 1% van de geteste vrouwen blijkt
                    HIV-positief te zijn. Door vroegtijdige opsporing en
                    behandeling kan overdracht op de baby in de meeste
                    gevallen worden voorkomen.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistieken kaarten */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary-700">~100</p>
                <p className="mt-1 text-sm text-gray-600">
                  Vrouwen ontvangen ART-medicatie
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary-700">~5.000</p>
                <p className="mt-1 text-sm text-gray-600">
                  Zwangere vrouwen getest per halfjaar
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary-700">~1%</p>
                <p className="mt-1 text-sm text-gray-600">
                  Test positief op HIV
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
