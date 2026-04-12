import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Landmark,
  Receipt,
  Handshake,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Hero from "@/components/Hero";
import DonateForm from "@/components/DonateForm";
import DonatieBedankt from "./DonatieBedankt";
import InfoCard from "@/components/ui/InfoCard";
import FactBox from "@/components/ui/FactBox";
import { features } from "@/lib/features";

export const metadata: Metadata = {
  title: "Steun ons",
  description:
    "Steun Stichting Kettingreactie met een donatie. Elke euro gaat 100% naar projecten voor kansarme vrouwen in India.",
};

export default function SteunOnsPage() {
  return (
    <>
      <Hero
        eyebrow="Steun ons werk"
        title="Word onderdeel van de kettingreactie"
        subtitle="Elke donatie gaat voor 100% naar onze drie projecten in Bangalore. Geen administratiekosten, geen salarissen — alles draait op vrijwilligers."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Steun Ons", href: "/steun-ons" },
        ]}
      />

      <DonatieBedankt />

      {/* Bankdonatie — primary path, editorial card */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary-600 p-10 shadow-2xl sm:p-16">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-48 w-48 -translate-x-1/3 -translate-y-1/3 rounded-full bg-accent-600/30 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/3 translate-y-1/3 rounded-full bg-azure-500/30 blur-[100px]"
            />
            <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div className="space-y-5 text-white">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-300">
                  Doneer direct
                </span>
                <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                  Via onze bankrekening
                </h2>
                <p className="text-lg text-primary-100">
                  Maak een bedrag over naar Stichting Kettingreactie en 100%
                  van uw donatie gaat direct naar de projecten in Bangalore.
                </p>
                <Link
                  href="/belastingaftrek-schenkingen"
                  className="inline-flex items-center gap-2 text-sm font-bold text-accent-300 hover:text-white hover:underline"
                >
                  Lees over belastingaftrek (ANBI)
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                  Rekeningnummer (IBAN)
                </p>
                <p className="mt-1 font-mono text-xl font-semibold tracking-wider text-white">
                  NL87 INGB 0005313860
                </p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                  T.n.v.
                </p>
                <p className="text-sm font-medium text-white">
                  Stichting Kettingreactie Amsterdam
                </p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                  RSIN
                </p>
                <p className="font-mono text-sm font-medium text-white">
                  821887300
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online donatieformulier — alleen als feature aan staat */}
      {features.mollieDonations && (
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                Online doneren
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary-600 sm:text-4xl">
                Liever direct via iDEAL?
              </h2>
              <p className="mt-3 text-lg text-ink-soft">
                Kies je bedrag en doneer in één klik.
              </p>
            </div>
            <DonateForm />
            <p className="mt-4 text-center text-xs text-ink-soft">
              Betalingen worden verwerkt door een externe betaalprovider.
              Wij slaan geen bank- of kaartgegevens op. Zie onze{" "}
              <Link
                href="/privacyverklaring"
                className="underline hover:text-accent-600"
              >
                privacyverklaring
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* Aanvullende mogelijkheden */}
      <section className="bg-cream-dark/50 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              Andere manieren om te steunen
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-primary-600 sm:text-5xl">
              Niet alleen via een donatie
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InfoCard icon={Receipt} title="Belastingaftrek via ANBI">
              <p>
                Stichting Kettingreactie heeft een ANBI-status, waardoor uw
                donaties aftrekbaar zijn van de inkomstenbelasting. U kunt
                uw giften opgeven in uw belastingaangifte — effectief kost
                uw donatie u dan minder.
              </p>
              <p>
                <a
                  href="https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/anbi-status-controleren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-accent-600 hover:underline"
                >
                  Controleer ANBI-status
                  <ExternalLink className="h-4 w-4" />
                </a>
              </p>
            </InfoCard>

            <InfoCard icon={Handshake} title="SponsorKliks — gratis steunen">
              <p>
                Steun ons gratis via SponsorKliks. Wanneer u via{" "}
                <a
                  href="https://www.sponsorkliks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-accent-600 hover:underline"
                >
                  sponsorkliks.com
                </a>{" "}
                winkelt bij bekende webshops, ontvangen wij een kleine
                vergoeding — zonder extra kosten voor u.
              </p>
              <Image
                src="/images/logos/sponsorkliks.png"
                alt="SponsorKliks logo"
                width={200}
                height={88}
                className="h-10 w-auto"
              />
            </InfoCard>

            <InfoCard icon={Landmark} title="Samenwerking met Wilde Ganzen">
              <p>
                Wij werken samen met Wilde Ganzen, een organisatie die
                kleinschalige projecten in ontwikkelingslanden ondersteunt
                en bijdraagt aan de financiering van onze projecten.
              </p>
            </InfoCard>

            <InfoCard icon={Heart} title="Word vrijwilliger of ambassadeur">
              <p>
                Steun ons niet alleen financieel — ook aandacht, tijd en
                expertise helpen. Neem contact op als u wilt meedenken of
                meehelpen.
              </p>
              <p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-bold text-accent-600 hover:underline"
                >
                  Contact opnemen →
                </Link>
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Cijfers naast elkaar */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FactBox label="Naar de projecten" value="100%" hint="Geen administratiekosten, geen salarissen" />
            <FactBox
              label="Rekening"
              value="NL87 INGB 0005313860"
              hint="t.n.v. Stichting Kettingreactie Amsterdam"
              mono
            />
            <FactBox label="RSIN" value="821887300" hint="ANBI geregistreerd" mono />
          </div>
        </div>
      </section>

      {/* AVG/privacy voetnoot */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-cream-dark/40 p-5 text-sm text-ink-soft">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
            <p>
              Donaties worden verwerkt conform de AVG. Wij bewaren alleen de
              gegevens die nodig zijn voor de fiscale bewaarplicht (7 jaar) en
              delen geen donateursinformatie met derden. Lees onze{" "}
              <Link
                href="/privacyverklaring"
                className="font-bold text-accent-600 hover:underline"
              >
                privacyverklaring
              </Link>{" "}
              voor meer informatie.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
