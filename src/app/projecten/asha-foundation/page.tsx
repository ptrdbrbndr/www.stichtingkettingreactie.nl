import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Stethoscope,
  Baby,
  Activity,
} from "lucide-react";
import Hero from "@/components/Hero";
import InfoCard from "@/components/ui/InfoCard";

export const metadata: Metadata = {
  title: "ASHA Foundation",
  description:
    "De ASHA Foundation richt zich op HIV-preventie en behandeling voor vrouwen in India, geleid door Dr. Glory Alexander.",
};

const stats = [
  { value: "~100", label: "Vrouwen ontvangen ART-medicatie" },
  { value: "~5.000", label: "Zwangere vrouwen getest per halfjaar" },
  { value: "~1%", label: "Test positief op HIV" },
];

export default function AshaFoundationPage() {
  return (
    <>
      <Hero
        eyebrow="Project 03 · HIV-preventie & behandeling"
        title="ASHA Foundation"
        subtitle="Levensreddende medische zorg voor HIV-positieve vrouwen in en rondom Bangalore. Geleid door Dr. Glory Alexander."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projecten", href: "/projecten" },
          { label: "ASHA Foundation", href: "/projecten/asha-foundation" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projecten"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-accent-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar alle projecten
          </Link>

          <div className="mb-16 overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/projecten/asha-foundation/dr-glory.jpg"
              alt="Dr. Glory Alexander van de ASHA Foundation"
              width={1620}
              height={1080}
              className="w-full"
              priority
            />
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="mb-14 border-l-4 border-accent-600 pl-6">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                Wat ASHA doet
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-primary-600 sm:text-4xl">
                Medische zorg voor vrouwen die anders geen toegang hebben
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                De ASHA Foundation wordt geleid door Dr. Glory Alexander en
                richt zich op HIV-preventie en behandeling voor vrouwen in en
                rondom Bangalore — met levensreddende zorg voor wie anders
                niet behandeld zou worden.
              </p>
            </div>

            {/* Stats strip */}
            <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-line bg-cream-dark/60 p-6 text-center"
                >
                  <p className="font-serif text-4xl font-bold text-primary-600 sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-14 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/projecten/asha-foundation/blood-test.png"
                  alt="Bloedtest bij ASHA Foundation"
                  width={760}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/projecten/asha-foundation/verpleegster.jpg"
                  alt="Verpleegster bij ASHA Foundation"
                  width={1080}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <InfoCard icon={Stethoscope} title="ART-medicatie voor 100 vrouwen">
                <p>
                  De ASHA Foundation voorziet in antiretrovirale therapie
                  (ART) voor circa 100 vrouwen — voornamelijk weduwen en
                  jonge HIV-positieve vrouwen die zonder deze medicatie geen
                  toegang zouden hebben tot behandeling. De medicatie houdt
                  het virus onder controle en maakt een waardig leven
                  mogelijk.
                </p>
              </InfoCard>

              <InfoCard icon={Baby} title="PMTCT-programma">
                <p>
                  Het PMTCT-programma (Prevention of Mother-to-Child
                  Transmission) richt zich op het voorkomen van
                  moeder-kind-overdracht van HIV. Door zwangere vrouwen te
                  testen en te behandelen wordt overdracht op de baby in de
                  meeste gevallen voorkomen.
                </p>
              </InfoCard>

              <InfoCard
                variant="highlight"
                icon={Activity}
                eyebrow="Impact in cijfers"
                title="5.000 getest per halfjaar"
              >
                <p>
                  In het kader van PMTCT worden circa 5.000 zwangere vrouwen
                  getest in een periode van zes maanden. Ongeveer 1% blijkt
                  HIV-positief — dankzij vroegtijdige opsporing en
                  behandeling kan overdracht vrijwel altijd voorkomen worden.
                </p>
                <p>
                  <Link
                    href="/steun-ons"
                    className="inline-flex items-center gap-1 font-bold text-accent-600 hover:underline"
                  >
                    Ook ASHA Foundation steunen →
                  </Link>
                </p>
              </InfoCard>
            </div>

            <div className="mt-14 overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/projecten/asha-foundation/sytze-jelly-glory.jpg"
                alt="Sytze en Jelly met Dr. Glory van ASHA Foundation"
                width={1852}
                height={1080}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
