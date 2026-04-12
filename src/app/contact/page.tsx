import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Landmark, Heart } from "lucide-react";
import Hero from "@/components/Hero";
import InfoCard from "@/components/ui/InfoCard";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Stichting Kettingreactie. Wij beantwoorden graag uw vragen.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Neem contact op"
        title="Wij horen graag van u"
        subtitle="Heeft u vragen over onze stichting, de projecten in Bangalore, of wilt u weten hoe u ons kunt steunen? Laat het ons weten — wij antwoorden persoonlijk."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InfoCard icon={Mail} title="E-mail">
              <p>
                Stuur ons een bericht. Wij beantwoorden alle vragen zo snel
                mogelijk.
              </p>
              <p>
                <a
                  href="mailto:info@stichtingkettingreactie.nl"
                  className="inline-flex items-center gap-1 font-bold text-accent-600 hover:underline"
                >
                  info@stichtingkettingreactie.nl →
                </a>
              </p>
            </InfoCard>

            <InfoCard icon={MapPin} title="Locatie">
              <p>Statutaire vestiging in Amsterdam, Nederland.</p>
              <p>
                Let op: wij zijn geen publiek toegankelijk kantoor. Neem
                eerst contact op voor een afspraak.
              </p>
            </InfoCard>

            <InfoCard icon={Landmark} title="Bankgegevens">
              <p>
                Rekeningnummer:{" "}
                <span className="font-mono font-bold text-primary-600">
                  NL87 INGB 0005313860
                </span>
              </p>
              <p className="text-sm">
                t.n.v. Stichting Kettingreactie Amsterdam · RSIN{" "}
                <span className="font-mono">821887300</span>
              </p>
            </InfoCard>

            <InfoCard
              variant="highlight"
              icon={Heart}
              title="Meedenken of meehelpen?"
            >
              <p>
                Wij verwelkomen vrijwilligers, ambassadeurs en partners die
                ons werk willen versterken — in Nederland of in Bangalore.
              </p>
              <p>
                <Link
                  href="/steun-ons"
                  className="inline-flex items-center gap-1 font-bold text-accent-600 hover:underline"
                >
                  Andere manieren om te steunen →
                </Link>
              </p>
            </InfoCard>
          </div>
        </div>
      </section>
    </>
  );
}
