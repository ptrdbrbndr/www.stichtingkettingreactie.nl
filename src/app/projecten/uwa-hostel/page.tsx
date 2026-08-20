import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "UWA Working Women's Hostel",
  description:
    "Het UWA Working Women's Hostel in Bangalore biedt veilige, betaalbare huisvesting aan jonge werkende vrouwen. Gerund door de University Women's Association Bangalore.",
};

export default function UwaHostelPage() {
  return (
    <>
      <Hero
        eyebrow="Hoofdstuk II · Huisvesting"
        title="UWA Working Women's Hostel"
        subtitle="Veilige en betaalbare huisvesting voor jonge vrouwen die vanuit dorpen naar Bangalore komen om te werken. Gerund door de University Women's Association Bangalore."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projecten", href: "/projecten" },
          { label: "UWA Hostel", href: "/projecten/uwa-hostel" },
        ]}
      />

      <figure className="mx-auto max-w-[96rem]">
        <div className="relative aspect-[21/9] min-h-[300px] w-full overflow-hidden">
          <Image
            src="/images/projecten/uwa-hostel/girls-audience.jpg"
            alt="Bewoonsters van het UWA-hostel tijdens een bijeenkomst"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="caption mx-4 sm:mx-6 lg:mx-8">
          Bewoonsters van het UWA-hostel tijdens een bijeenkomst, Bangalore.
        </figcaption>
      </figure>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-2">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              Een veilige plek voor wie voor het eerst het dorp verlaat
            </h2>
            <div className="mt-7 space-y-6 font-serif text-lg leading-relaxed text-ink">
              <p>
                Voor veel bewoonsters is het de eerste keer dat zij hun dorp
                verlaten. In een stad als Bangalore is betaalbare en veilige
                huisvesting voor alleenstaande jonge vrouwen moeilijk te
                vinden. Het hostel geeft hun een plek om te wonen terwijl zij
                werken, zonder zorgen over hun veiligheid.
              </p>
              <p>
                Het hostel wordt gerund door de University Women&apos;s
                Association Bangalore, een organisatie die zich al decennia
                inzet voor het welzijn van vrouwen in de regio.
              </p>
              <p>
                Met een eigen inkomen bouwen de bewoonsters zelfstandigheid op.
                Veel van hen ondersteunen daarmee ook hun familie op het
                platteland; zo reikt het hostel verder dan de vrouwen die er
                wonen.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:-mr-24">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/projecten/uwa-hostel/alumni-meeting.jpg"
                    alt="Oud-bewoonsters tijdens een alumnibijeenkomst van het hostel"
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="caption">
                  Alumnibijeenkomst: oud-bewoonsters keren terug.
                </figcaption>
              </figure>
              <figure className="sm:mt-10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/projecten/uwa-hostel/hostel-collage.jpg"
                    alt="Het gebouw en de gemeenschappelijke ruimtes van het UWA-hostel"
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="caption">
                  Het gebouw en de gemeenschappelijke ruimtes.
                </figcaption>
              </figure>
            </div>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="border-t-2 border-rule pt-5">
              <p className="kicker text-magenta">Wat uw gift hier doet</p>
              <dl className="mt-5 space-y-5 font-serif">
                <div>
                  <dt className="kicker text-ink-2">Exploitatie</dt>
                  <dd className="mt-1 text-[1.0625rem] leading-relaxed text-ink">
                    Bijdrage aan het onderhoud en de exploitatie van het
                    hostel, zodat de huur voor de bewoonsters betaalbaar
                    blijft.
                  </dd>
                </div>
                <div>
                  <dt className="kicker text-ink-2">Doorwerking</dt>
                  <dd className="mt-1 text-[1.0625rem] leading-relaxed text-ink">
                    Een bewoonster met werk en woonruimte ondersteunt
                    doorgaans ook haar familie in het dorp.
                  </dd>
                </div>
              </dl>
              <Link
                href="/steun-ons"
                className="kicker mt-7 inline-block bg-magenta px-6 py-3.5 text-paper transition-colors hover:bg-magenta-deep"
              >
                Doneer
              </Link>
              <p className="mt-5 border-t border-rule-soft pt-4 font-serif text-[0.9375rem] leading-relaxed text-ink-2">
                <span className="mark-azure text-ink">
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
            href="/projecten/abayashram"
            className="link-editorial font-serif text-lg"
          >
            Hoofdstuk I: Abayashram
          </Link>
          <Link
            href="/projecten/asha-foundation"
            className="link-editorial font-serif text-lg"
          >
            Hoofdstuk III: ASHA Foundation
          </Link>
        </nav>
      </section>
    </>
  );
}
