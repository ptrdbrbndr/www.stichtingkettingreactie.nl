import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, GraduationCap, TrendingUp } from "lucide-react";
import Hero from "@/components/Hero";
import InfoCard from "@/components/ui/InfoCard";

export const metadata: Metadata = {
  title: "UWA Working Women's Hostel",
  description:
    "Het UWA Working Women's Hostel biedt veilige huisvesting aan jonge werkende vrouwen uit landelijke gebieden in Bangalore.",
};

export default function UwaHostelPage() {
  return (
    <>
      <Hero
        eyebrow="Project 02 · Huisvesting & veiligheid"
        title="UWA Hostel"
        subtitle="Veilige en betaalbare huisvesting voor jonge werkende vrouwen die vanuit landelijke gebieden naar Bangalore komen. Gerund door de University Women's Association Bangalore."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projecten", href: "/projecten" },
          { label: "UWA Hostel", href: "/projecten/uwa-hostel" },
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
              src="/images/projecten/uwa-hostel/hostel-collage.jpg"
              alt="Collage van het UWA Working Women's Hostel"
              width={914}
              height={341}
              className="w-full"
              priority
            />
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="mb-14 border-l-4 border-accent-600 pl-6">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                Wat UWA doet
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-primary-600 sm:text-4xl">
                Een veilige start voor vrouwen die op eigen benen staan in de
                grote stad
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Voor veel van deze vrouwen is het de eerste keer dat zij hun
                dorp verlaten. In een stad als Bangalore is betaalbare en
                veilige huisvesting voor alleenstaande jonge vrouwen moeilijk te
                vinden. Het hostel biedt hun de mogelijkheid om zelfstandig te
                worden zonder zich zorgen te hoeven maken over hun veiligheid.
              </p>
            </div>

            <div className="mb-14 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/projecten/uwa-hostel/girls-audience.jpg"
                  alt="Meisjes in het publiek bij een bijeenkomst"
                  width={904}
                  height={916}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/projecten/uwa-hostel/alumni-meeting.jpg"
                  alt="Alumni bijeenkomst van het UWA Hostel"
                  width={1280}
                  height={575}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <InfoCard icon={GraduationCap} title="University Women's Association Bangalore">
                <p>
                  Het hostel wordt gerund door de University Women&apos;s
                  Association (UWA) Bangalore — een organisatie die zich al
                  jarenlang inzet voor emancipatie en welzijn van vrouwen in
                  de regio.
                </p>
              </InfoCard>

              <InfoCard icon={ShieldCheck} title="Veilige omgeving">
                <p>
                  Het hostel biedt een veilige en betaalbare omgeving voor
                  vrouwen om te wonen terwijl zij werken. Zelfstandigheid
                  opbouwen zonder zich zorgen te hoeven maken over
                  veiligheid — dat is wat UWA mogelijk maakt.
                </p>
              </InfoCard>

              <InfoCard
                variant="highlight"
                icon={TrendingUp}
                eyebrow="Impact"
                title="Een kettingreactie van onafhankelijkheid"
              >
                <p>
                  Dankzij het hostel kunnen jonge vrouwen vanuit het
                  platteland in Bangalore werken en een eigen inkomen
                  verdienen. Veel van hen ondersteunen op hun beurt hun
                  families op het platteland — een directe kettingreactie.
                </p>
                <p>
                  <Link
                    href="/steun-ons"
                    className="inline-flex items-center gap-1 font-bold text-accent-600 hover:underline"
                  >
                    Ook UWA steunen →
                  </Link>
                </p>
              </InfoCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
