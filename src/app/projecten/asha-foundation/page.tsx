import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "ASHA Foundation",
  description:
    "De ASHA Foundation in Bangalore, geleid door Dr. Glory Alexander, biedt ART-medicatie aan circa 100 HIV-positieve vrouwen en test per half jaar zo'n 5.000 zwangere vrouwen (PMTCT).",
};

export default function AshaFoundationPage() {
  return (
    <>
      <Hero
        eyebrow="Hoofdstuk III · HIV-zorg"
        title="ASHA Foundation"
        subtitle="Medische zorg voor HIV-positieve vrouwen in en rondom Bangalore, geleid door Dr. Glory Alexander: ART-medicatie en een programma dat overdracht van moeder op kind voorkomt."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projecten", href: "/projecten" },
          { label: "ASHA Foundation", href: "/projecten/asha-foundation" },
        ]}
      />

      <figure className="mx-auto max-w-[96rem]">
        <div className="relative aspect-[21/9] min-h-[300px] w-full overflow-hidden">
          <Image
            src="/images/projecten/asha-foundation/dr-glory.jpg"
            alt="Dr. Glory Alexander van de ASHA Foundation"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="caption mx-4 sm:mx-6 lg:mx-8">
          Dr. Glory Alexander, oprichter en drijvende kracht van de ASHA
          Foundation, Bangalore.
        </figcaption>
      </figure>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Cijferregel van dit hoofdstuk */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 border-t-2 border-rule pt-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-5xl font-medium text-madder">
              ± 100
            </p>
            <p className="kicker mt-3 text-ink-2">
              Vrouwen ontvangen ART-medicatie
            </p>
          </div>
          <div>
            <p className="font-serif text-5xl font-medium text-ink">± 5.000</p>
            <p className="kicker mt-3 text-ink-2">
              Zwangere vrouwen getest per half jaar
            </p>
          </div>
          <div>
            <p className="font-serif text-5xl font-medium text-ink">± 1%</p>
            <p className="kicker mt-3 text-ink-2">
              Test positief en wordt direct behandeld
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-2">
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              Behandeling voor wie er anders geen toegang toe heeft
            </h2>
            <div className="mt-7 space-y-6 font-serif text-lg leading-relaxed text-ink">
              <p>
                De ASHA Foundation voorziet circa 100 vrouwen van
                antiretrovirale therapie (ART), vooral weduwen en jonge
                HIV-positieve vrouwen die de medicatie zelf niet kunnen
                betalen. De behandeling houdt het virus onder controle en
                maakt een gewoon leven mogelijk.
              </p>
              <p>
                Daarnaast draait de foundation een PMTCT-programma (Prevention
                of Mother-to-Child Transmission): per half jaar worden zo&apos;n
                5.000 zwangere vrouwen getest. Ongeveer 1% blijkt
                HIV-positief. Door tijdige opsporing en behandeling wordt
                overdracht op de baby vrijwel altijd voorkomen.
              </p>
              <p>
                De foundation staat onder leiding van Dr. Glory Alexander, die
                het werk in Bangalore sinds de oprichting draagt.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:-mr-24">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/projecten/asha-foundation/blood-test.png"
                    alt="Bloedafname voor een HIV-test bij de ASHA Foundation"
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="caption">
                  Bloedafname voor een HIV-test.
                </figcaption>
              </figure>
              <figure className="sm:mt-10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/projecten/asha-foundation/verpleegster.jpg"
                    alt="Verpleegkundige van de ASHA Foundation"
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="caption">
                  Verpleegkundige van de foundation.
                </figcaption>
              </figure>
            </div>

            <figure className="mt-12">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/projecten/asha-foundation/sytze-jelly-glory.jpg"
                  alt="Bestuursleden Sytze en Jelly met Dr. Glory Alexander"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="caption">
                Bestuursleden Sytze en Jelly met Dr. Glory Alexander tijdens
                een projectbezoek; reizen op eigen kosten.
              </figcaption>
            </figure>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="border-t-2 border-rule pt-5">
              <p className="kicker text-madder">Wat uw gift hier doet</p>
              <dl className="mt-5 space-y-5 font-serif">
                <div>
                  <dt className="kicker text-ink-2">ART-medicatie</dt>
                  <dd className="mt-1 text-[1.0625rem] leading-relaxed text-ink">
                    Financiering van antiretrovirale therapie voor circa 100
                    vrouwen die de behandeling zelf niet kunnen betalen.
                  </dd>
                </div>
                <div>
                  <dt className="kicker text-ink-2">PMTCT-tests</dt>
                  <dd className="mt-1 text-[1.0625rem] leading-relaxed text-ink">
                    Bijdrage aan het testprogramma voor zwangere vrouwen, zo&apos;n
                    5.000 tests per half jaar.
                  </dd>
                </div>
              </dl>
              <Link
                href="/steun-ons"
                className="kicker mt-7 inline-block bg-madder px-6 py-3.5 text-paper transition-colors hover:bg-madder-deep"
              >
                Doneer
              </Link>
              <p className="mt-5 border-t border-rule-soft pt-4 font-serif text-[0.9375rem] leading-relaxed text-ink-2">
                <span className="mark-turmeric text-ink">
                  Elke euro gaat naar de projecten.
                </span>{" "}
                ANBI, RSIN 821887300.
              </p>
            </div>
          </aside>
        </div>

        <nav
          aria-label="Hoofdstukken"
          className="mt-20 flex items-baseline justify-between border-t-2 border-rule pt-6"
        >
          <Link
            href="/projecten/uwa-hostel"
            className="link-editorial font-serif text-lg"
          >
            Hoofdstuk II: UWA Working Women&apos;s Hostel
          </Link>
          <Link href="/projecten" className="link-editorial font-serif text-lg">
            Alle projecten
          </Link>
        </nav>
      </section>
    </>
  );
}
