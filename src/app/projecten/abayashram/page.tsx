import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Abayashram – Vision India",
  description:
    "Abayashram is een opvanghuis voor circa 45 vrouwen met psychische problemen nabij Hoskote, gerund door Joby Varghese en Vision India.",
};

export default function AbayashramPage() {
  return (
    <>
      <Hero
        eyebrow="Hoofdstuk I · Opvang en rehabilitatie"
        title="Abayashram"
        subtitle="Een opvanghuis voor circa 45 vrouwen met ernstige psychische problemen, nabij Hoskote, even buiten Bangalore. Gerund door Joby Varghese en Vision India."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projecten", href: "/projecten" },
          { label: "Abayashram", href: "/projecten/abayashram" },
        ]}
      />

      {/* Openingsfoto */}
      <figure className="mx-auto max-w-[96rem]">
        <div className="relative aspect-[21/9] min-h-[300px] w-full overflow-hidden">
          <Image
            src="/images/projecten/abayashram/abayashram-dak.jpg"
            alt="Abayashram gezien vanaf het dak"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="caption mx-4 sm:mx-6 lg:mx-8">
          Abayashram gezien vanaf het dak, Hoskote.
        </figcaption>
      </figure>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Leeskolom */}
          <div className="lg:col-span-7 lg:col-start-2">
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              Onderdak voor vrouwen die nergens anders terechtkunnen
            </h2>
            <div className="mt-7 space-y-6 font-serif text-lg leading-relaxed text-ink">
              <p>
                Abayashram biedt onderdak aan circa 45 vrouwen met ernstige
                psychische problemen. Veel van hen zijn op straat gevonden of
                achtergelaten door hun familie. In het huis krijgen zij een bed,
                maaltijden, medische en psychologische zorg.
              </p>
              <p>
                Het rehabilitatieprogramma is erop gericht de vrouwen te
                stabiliseren en waar dat kan te herenigen met hun familie.
                Vrouwen die niet terug kunnen, blijven: voor hen is Abayashram
                een blijvend thuis.
              </p>
              <p>
                Het huis wordt gerund door Joby Varghese en zijn organisatie
                Vision India, met een klein team dat dag en nacht voor de
                vrouwen zorgt. De organisatie ontvangt weinig overheidssteun en
                draait grotendeels op donaties.
              </p>
            </div>

            {/* Fotopaar — breekt de leeskolom */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:-mr-24">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/projecten/abayashram/vrouwen-abayashram.jpg"
                    alt="Vrouwen van Abayashram"
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="caption">
                  Vrouwen van Abayashram.
                </figcaption>
              </figure>
              <figure className="sm:mt-10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/projecten/abayashram/handwerk.jpg"
                    alt="Handwerk gemaakt door de vrouwen"
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="caption">
                  Handwerk uit het dagprogramma.
                </figcaption>
              </figure>
            </div>

            <figure className="mt-12">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/projecten/abayashram/sytze-jelly-abayashram.jpg"
                  alt="Bestuursleden Sytze en Jelly op bezoek bij de vrouwen van Abayashram"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="caption">
                Bestuursleden Sytze en Jelly op bezoek bij Abayashram; reizen
                op eigen kosten.
              </figcaption>
            </figure>
          </div>

          {/* Kantlijn */}
          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="border-t-2 border-rule pt-5">
              <p className="kicker text-madder">Wat uw gift hier doet</p>
              <dl className="mt-5 space-y-5 font-serif">
                <div>
                  <dt className="kicker text-ink-2">Vervoer</dt>
                  <dd className="mt-1 text-[1.0625rem] leading-relaxed text-ink">
                    De stichting sponsorde de auto waarmee de vrouwen naar
                    ziekenhuizen en medische voorzieningen worden gebracht.
                  </dd>
                </div>
                <div>
                  <dt className="kicker text-ink-2">Dagelijkse kosten</dt>
                  <dd className="mt-1 text-[1.0625rem] leading-relaxed text-ink">
                    Structurele bijdrage aan voeding, verzorging en medicatie
                    voor de circa 45 bewoonsters.
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

        {/* Hoofdstuknavigatie */}
        <nav
          aria-label="Hoofdstukken"
          className="mt-20 flex items-baseline justify-between border-t-2 border-rule pt-6"
        >
          <Link href="/projecten" className="link-editorial font-serif text-lg">
            Alle projecten
          </Link>
          <Link
            href="/projecten/uwa-hostel"
            className="link-editorial font-serif text-lg"
          >
            Hoofdstuk II: UWA Working Women&apos;s Hostel
          </Link>
        </nav>
      </section>
    </>
  );
}
