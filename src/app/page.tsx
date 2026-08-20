import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { getHomepageConfig, getArticles } from "@ptrdbrbndr/cms";
import { decodeEntities } from "@/lib/text";

export const metadata: Metadata = {
  title: "Stichting Kettingreactie: drie projecten voor vrouwen in Bangalore",
  description:
    "Stichting Kettingreactie financiert sinds 2007 een opvanghuis, een hostel voor werkende vrouwen en een HIV-programma in en rondom Bangalore. ANBI; elke gedoneerde euro gaat naar de projecten.",
};

function formatDutchDate(value: string | null | undefined) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function HomePage() {
  const supabase = await createClient();

  const [config, { articles: latestNews }] = await Promise.all([
    getHomepageConfig(supabase),
    getArticles(supabase, {
      status: "published",
      orderBy: "published_at",
      orderDirection: "desc",
      limit: 6,
    }),
  ]);

  const heroTitle =
    config?.hero_title ?? "Drie projecten voor vrouwen in Bangalore";
  const heroSubtitle =
    config?.hero_subtitle ??
    "Stichting Kettingreactie financiert sinds 2007 een opvanghuis, een hostel voor werkende vrouwen en een HIV-programma in en rondom Bangalore. Het bestuur werkt onbetaald; elke gedoneerde euro gaat naar de projecten.";
  const heroCta = config?.hero_cta_text ?? "Doneer";
  const heroCtaHref = config?.hero_cta_href ?? "/steun-ons";

  const missionTitle =
    config?.mission_title ?? "Klein genoeg om precies te weten waar het geld blijft";
  const missionText =
    config?.mission_text ??
    "De stichting is in 2007 opgericht na een bezoek aan de projecten rond Bangalore. Sindsdien werven wij in Nederland fondsen voor drie lokale organisaties die opvang, huisvesting en medische zorg bieden aan vrouwen. Bestuursleden bezoeken de projecten op eigen kosten en zien ter plaatse wat er met de donaties gebeurt.";

  const newsTitle = config?.news_title ?? "Verslagen uit Bangalore";
  const donateIban = config?.donate_iban ?? "NL87 INGB 0005313860";
  const donateIbanName =
    config?.donate_iban_name ?? "Stichting Kettingreactie Amsterdam";

  const [featuredArticle, ...restArticles] = latestNews;
  const newsFeatured = restArticles[0] ?? featuredArticle;
  const newsList = restArticles.slice(1, 5);

  const heroFeature = featuredArticle
    ? {
        title: decodeEntities(featuredArticle.title),
        excerpt: decodeEntities(featuredArticle.excerpt),
        slug: featuredArticle.slug,
        category:
          decodeEntities(featuredArticle.category?.name) || "Nieuws",
        date: featuredArticle.published_at ?? featuredArticle.created_at,
        image: featuredArticle.featured_image,
      }
    : null;

  const projecten = [
    {
      nummer: "I",
      slug: "01",
      title: "Abayashram",
      plaats: "Hoskote, bij Bangalore",
      organisatie: "Vision India, Joby Varghese",
      beschrijving:
        "Een opvanghuis voor circa 45 vrouwen met ernstige psychische problemen, van wie velen op straat zijn gevonden of door hun familie zijn achtergelaten. Zij krijgen onderdak, medische en psychologische zorg en waar het kan hereniging met hun familie.",
      bijdrage:
        "De stichting sponsorde onder meer de auto waarmee de vrouwen naar het ziekenhuis worden gebracht en draagt bij aan de dagelijkse kosten.",
      href: "/projecten/abayashram",
      image: "/images/projecten/abayashram/vrouwen-abayashram.jpg",
      imageAlt: "Vrouwen van Abayashram, Hoskote",
      aspect: "aspect-[3/2]",
    },
    {
      nummer: "II",
      slug: "02",
      title: "UWA Working Women's Hostel",
      plaats: "Bangalore",
      organisatie: "University Women's Association Bangalore",
      beschrijving:
        "Betaalbare en veilige huisvesting voor jonge vrouwen die vanuit dorpen naar Bangalore komen om te werken. Voor de meesten is het de eerste keer buiten hun dorp; veel bewoners ondersteunen met hun inkomen hun familie op het platteland.",
      bijdrage:
        "De stichting draagt bij aan het onderhoud en de exploitatie van het hostel.",
      href: "/projecten/uwa-hostel",
      image: "/images/projecten/uwa-hostel/girls-audience.jpg",
      imageAlt: "Bewoonsters van het UWA-hostel tijdens een bijeenkomst",
      aspect: "aspect-square",
    },
    {
      nummer: "III",
      slug: "03",
      title: "ASHA Foundation",
      plaats: "Bangalore",
      organisatie: "Dr. Glory Alexander",
      beschrijving:
        "HIV-zorg voor vrouwen: ART-medicatie voor circa 100 vrouwen, vooral weduwen en jonge HIV-positieve vrouwen, en een PMTCT-programma dat per half jaar zo'n 5.000 zwangere vrouwen test om overdracht van moeder op kind te voorkomen.",
      bijdrage:
        "De stichting financiert ART-medicatie en draagt bij aan het PMTCT-testprogramma.",
      href: "/projecten/asha-foundation",
      image: "/images/projecten/asha-foundation/dr-glory.jpg",
      imageAlt: "Dr. Glory Alexander van de ASHA Foundation",
      aspect: "aspect-[3/2]",
    },
  ];

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        showCta
        ctaText={heroCta}
        ctaHref={heroCtaHref}
        featureArticle={heroFeature}
      />

      {/* Openingsfoto — full-bleed met bijschrift */}
      <figure className="mx-auto max-w-[96rem]">
        <div className="relative aspect-[21/9] min-h-[320px] w-full overflow-hidden">
          <Image
            src="/images/projecten/abayashram/handwerk.jpg"
            alt="Handwerk van de vrouwen van Abayashram"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="caption mx-4 sm:mx-6 lg:mx-8">
          Handwerk van de vrouwen van Abayashram, Hoskote. Foto: bestuursbezoek
          aan de projecten.
        </figcaption>
      </figure>

      {/* Cijferregel */}
      <section
        data-testid="impact-strip"
        className="mx-auto max-w-7xl px-4 pb-4 pt-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t-2 border-rule pt-8 lg:grid-cols-4">
          <div>
            <p className="font-serif text-6xl font-medium text-ink">3</p>
            <p className="kicker mt-3 text-ink-2">
              Projecten in en rondom Bangalore
            </p>
          </div>
          <div>
            <p className="font-serif text-6xl font-medium text-madder">100%</p>
            <p className="kicker mt-3 text-ink-2">
              Van elke gift naar de projecten
            </p>
          </div>
          <div>
            <p className="font-serif text-6xl font-medium text-ink">2007</p>
            <p className="kicker mt-3 text-ink-2">
              Opgericht, sindsdien ANBI-erkend
            </p>
          </div>
          <div>
            <p className="font-serif text-6xl font-medium text-ink">€ 0</p>
            <p className="kicker mt-3 text-ink-2">
              Bestuursvergoeding; reizen op eigen kosten
            </p>
          </div>
        </div>
      </section>

      {/* Missie — verspringende leeskolommen */}
      <section
        data-testid="missie-section"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="folio">
              <p className="kicker text-madder">Waarom deze stichting</p>
            </div>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.06] tracking-tight text-ink sm:text-5xl">
              {missionTitle}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-6 lg:pt-24">
            <p className="font-serif text-xl leading-relaxed text-ink">
              {missionText}
            </p>
            <p className="mt-6 font-serif text-xl leading-relaxed text-ink">
              De naam verwijst naar het idee dat iedere bijdrage een reactie in
              gang zet die verder reikt dan je op het eerste gezicht verwacht:
              een vrouw met een eigen inkomen ondersteunt op haar beurt haar
              familie.
            </p>
            <Link
              href="/over-ons"
              data-testid="missie-link"
              className="link-editorial mt-8 inline-block font-serif text-lg"
            >
              Over de stichting en het bestuur
            </Link>
          </div>
          <div className="hidden lg:col-span-2 lg:block lg:pt-24">
            <div className="border-t-2 border-rule pt-4">
              <p className="kicker text-ink-2">Kantlijn</p>
              <p className="mt-3 font-serif text-[0.9375rem] leading-relaxed text-ink-2">
                Jaarlijkse verantwoording, ANBI, RSIN 821887300. De jaarcijfers
                staan{" "}
                <Link
                  href="/financieel-overzicht-2012"
                  className="link-editorial"
                >
                  hier
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* De drie projecten — drie hoofdstukken */}
      <section
        data-testid="projecten-section"
        className="border-t-2 border-rule bg-paper-3/60"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="folio border-t-0 pt-0">
            <p className="kicker text-madder">Katern · De drie projecten</p>
            <p className="kicker hidden text-ink-2 sm:block">
              In en rondom Bangalore
            </p>
          </div>

          <div className="mt-14 space-y-20 sm:space-y-28">
            {projecten.map((project, idx) => {
              const reversed = idx % 2 === 1;
              return (
                <article
                  key={project.slug}
                  data-testid={`project-card-${project.slug}`}
                  className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-0"
                >
                  <div
                    className={`lg:col-span-6 ${
                      reversed ? "lg:order-2 lg:col-start-7" : ""
                    }`}
                  >
                    <figure>
                      <div
                        className={`relative ${project.aspect} overflow-hidden`}
                      >
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="caption">
                        {project.imageAlt}
                      </figcaption>
                    </figure>
                  </div>
                  <div
                    className={`lg:col-span-5 ${
                      reversed
                        ? "lg:order-1 lg:col-start-1 lg:pr-14"
                        : "lg:col-start-8 lg:pl-2"
                    } lg:-mt-2`}
                  >
                    <p
                      aria-hidden="true"
                      className="font-serif text-7xl font-medium leading-none text-madder"
                    >
                      {project.nummer}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="kicker mt-3 text-ink-2">
                      {project.plaats} · {project.organisatie}
                    </p>
                    <p className="mt-5 font-serif text-lg leading-relaxed text-ink">
                      {project.beschrijving}
                    </p>
                    <p className="mt-4 border-l-2 border-rule pl-4 font-serif text-[1.0625rem] leading-relaxed text-ink-2">
                      {project.bijdrage}
                    </p>
                    <Link
                      href={project.href}
                      className="link-editorial mt-6 inline-block font-serif text-lg"
                    >
                      Hoofdstuk {project.nummer}: {project.title}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16 border-t border-rule-soft pt-6">
            <Link
              href="/projecten"
              data-testid="projecten-all-link"
              className="link-editorial font-serif text-lg"
            >
              Alle drie de projecten in één overzicht
            </Link>
          </div>
        </div>
      </section>

      {/* Verslagen */}
      <section
        data-testid="nieuws-section"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="folio">
          <p className="kicker text-madder">{newsTitle}</p>
          <p className="kicker hidden text-ink-2 sm:block">
            Bezoekverslagen en berichten
          </p>
        </div>

        {latestNews.length === 0 ? (
          <p className="mt-10 font-serif text-lg text-ink-2">
            Er zijn nog geen verslagen gepubliceerd.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              {newsFeatured?.featured_image && (
                <Link href={`/nieuws/${newsFeatured.slug}`} className="block">
                  <figure>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={newsFeatured.featured_image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </figure>
                </Link>
              )}
              <p className="kicker mt-6 text-madder">
                {decodeEntities(newsFeatured?.category?.name) || "Verslag"} ·{" "}
                {formatDutchDate(
                  newsFeatured?.published_at ?? newsFeatured?.created_at,
                )}
              </p>
              <Link
                href={`/nieuws/${newsFeatured?.slug ?? ""}`}
                data-testid="nieuws-featured-link"
                className="group block"
              >
                <h3 className="mt-3 font-serif text-3xl font-medium leading-[1.1] tracking-tight text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-ink sm:text-4xl">
                  {decodeEntities(newsFeatured?.title)}
                </h3>
              </Link>
              {newsFeatured?.excerpt && (
                <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink-2">
                  {decodeEntities(newsFeatured.excerpt)}
                </p>
              )}
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <ul>
                {newsList.map((article) => (
                  <li
                    key={article.id}
                    className="border-b border-rule-soft py-5 first:border-t-2 first:border-t-rule"
                  >
                    <Link href={`/nieuws/${article.slug}`} className="group block">
                      <p className="kicker text-ink-2">
                        {formatDutchDate(
                          article.published_at ?? article.created_at,
                        )}
                      </p>
                      <h4 className="mt-1.5 font-serif text-xl font-medium leading-snug text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-ink">
                        {decodeEntities(article.title)}
                      </h4>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/nieuws"
                data-testid="nieuws-all-link"
                className="link-editorial mt-6 inline-block font-serif text-lg"
              >
                Het volledige archief
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Doneer-strook — één rustige route */}
      <section
        data-testid="donatie-cta"
        className="border-t-2 border-rule bg-paper-3/60"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="kicker text-madder">Steunen</p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
                Een gift komt zonder omwegen aan
              </h2>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-2">
                De stichting heeft geen kantoor en geen betaalde krachten.
                Giften zijn aftrekbaar; de ANBI-registratie is te controleren
                bij de Belastingdienst onder RSIN 821887300.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border-t-2 border-rule pt-5">
                <p className="kicker text-ink-2">Rekeningnummer</p>
                <p className="mt-2 font-serif text-3xl tracking-wide text-ink sm:text-4xl">
                  {donateIban}
                </p>
                <p className="mt-1 font-serif text-[1.0625rem] text-ink-2">
                  t.n.v. {donateIbanName}
                </p>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-7">
                <Link
                  href="/steun-ons"
                  data-testid="donatie-cta-button"
                  className="kicker bg-madder px-7 py-4 text-paper transition-colors hover:bg-madder-deep"
                >
                  Doneer
                </Link>
                <Link
                  href="/belastingaftrek-schenkingen"
                  className="link-editorial font-serif text-lg"
                >
                  Over belastingaftrek
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
