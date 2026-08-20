import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Schakel from "@/components/Schakel";
import Onthul from "@/components/Onthul";
import { createClient } from "@/lib/supabase/server";
import { getHomepageConfig, getArticles } from "@ptrdbrbndr/cms";
import { decodeEntities } from "@/lib/text";

export const metadata: Metadata = {
  title: "Stichting Kettingreactie: drie projecten voor vrouwen in Bangalore",
  description:
    "Stichting Kettingreactie financiert sinds 2007 een opvanghuis, een hostel voor werkende vrouwen en een HIV-programma in en rondom Bangalore. ANBI; elke gedoneerde euro gaat naar de projecten.",
};

// Terugval: eerste afbeelding uit de artikelinhoud (weinig artikelen hebben
// een los ingestelde featured image, de verslagen zelf staan vol foto's).
function eersteAfbeelding(html: string | null | undefined) {
  if (!html) return null;
  const m = html.match(/<img[^>]+src="([^"]+)"/);
  return m?.[1] ?? null;
}

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
      limit: 4,
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
  const nieuwsDrie = latestNews.slice(0, 3);

  const heroFeature = featuredArticle
    ? {
        title: decodeEntities(featuredArticle.title),
        excerpt: decodeEntities(featuredArticle.excerpt),
        slug: featuredArticle.slug,
        category: decodeEntities(featuredArticle.category?.name) || "Nieuws",
        date: featuredArticle.published_at ?? featuredArticle.created_at,
        image: featuredArticle.featured_image,
      }
    : null;
  void restArticles;

  const projecten = [
    {
      nummer: "I",
      slug: "01",
      kleur: "text-azure-bright",
      title: "Abayashram",
      plaats: "Hoskote, bij Bangalore",
      beschrijving:
        "Opvanghuis voor circa 45 vrouwen met ernstige psychische problemen. Onderdak, medische en psychologische zorg, en waar het kan hereniging met familie.",
      bijdrage: "De stichting sponsorde de ziekenhuisauto en draagt bij aan de dagelijkse kosten.",
      href: "/projecten/abayashram",
      image: "/images/projecten/abayashram/vrouwen-abayashram.jpg",
      imageAlt: "Vrouwen van Abayashram, Hoskote",
    },
    {
      nummer: "II",
      slug: "02",
      kleur: "text-[#2f2483]",
      title: "UWA Working Women's Hostel",
      plaats: "Bangalore",
      beschrijving:
        "Veilige, betaalbare huisvesting voor jonge vrouwen die vanuit dorpen naar Bangalore komen om te werken; velen ondersteunen daarmee hun familie.",
      bijdrage: "De stichting draagt bij aan onderhoud en exploitatie van het hostel.",
      href: "/projecten/uwa-hostel",
      image: "/images/projecten/uwa-hostel/girls-audience.jpg",
      imageAlt: "Bewoonsters van het UWA-hostel tijdens een bijeenkomst",
      positie: "object-[50%_30%]",
    },
    {
      nummer: "III",
      slug: "03",
      kleur: "text-magenta-bright",
      title: "ASHA Foundation",
      plaats: "Bangalore",
      beschrijving:
        "HIV-zorg onder leiding van Dr. Glory Alexander: ART-medicatie voor circa 100 vrouwen en een PMTCT-programma met zo'n 5.000 tests per half jaar.",
      bijdrage: "De stichting financiert ART-medicatie en draagt bij aan het testprogramma.",
      href: "/projecten/asha-foundation",
      image: "/images/projecten/asha-foundation/dr-glory.jpg",
      imageAlt: "Dr. Glory Alexander van de ASHA Foundation",
      positie: "object-[50%_35%]",
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

      {/* Openingsfoto — schuift over de donkere hero heen */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <figure className="relative z-10 -mt-6 sm:-mt-10">
          <div className="foto foto-diep relative aspect-[21/9] min-h-[280px]">
            <Image
              src="/images/projecten/abayashram/handwerk.jpg"
              alt="Handwerk van de vrouwen van Abayashram"
              fill
              priority
              sizes="(min-width: 1280px) 80rem, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="caption border-t-0 text-center">
            Handwerk van de vrouwen van Abayashram, Hoskote. Foto:
            bestuursbezoek aan de projecten.
          </figcaption>
        </figure>
      </div>

      {/* Cijferregel */}
      <section
        data-testid="impact-strip"
        className="mx-auto max-w-6xl px-4 pb-20 pt-14 text-center sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          <Onthul>
            <p className="font-display text-6xl font-semibold text-ink">3</p>
            <p className="kicker mt-3 text-ink-2">
              Projecten in en rondom Bangalore
            </p>
          </Onthul>
          <Onthul delay={90}>
            <p className="font-display text-6xl font-semibold text-magenta">
              100%
            </p>
            <p className="kicker mt-3 text-ink-2">
              Van elke gift naar de projecten
            </p>
          </Onthul>
          <Onthul delay={180}>
            <p className="font-display text-6xl font-semibold text-ink">2007</p>
            <p className="kicker mt-3 text-ink-2">
              Opgericht, sindsdien ANBI-erkend
            </p>
          </Onthul>
          <Onthul delay={270}>
            <p className="font-display text-6xl font-semibold text-ink">€ 0</p>
            <p className="kicker mt-3 text-ink-2">
              Bestuursvergoeding; reizen op eigen kosten
            </p>
          </Onthul>
        </div>
      </section>

      {/* Missie — getint blok */}
      <section data-testid="missie-section" className="bg-paper-3">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <Onthul>
            <p className="kicker text-magenta">Waarom deze stichting</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {missionTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink">
              {missionText}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              De naam verwijst naar wat we daar zien: een bijdrage zet een
              reactie in gang die verder reikt dan de eerste ontvanger. Een
              vrouw met een eigen inkomen ondersteunt op haar beurt haar
              familie.
            </p>
            <Link
              href="/over-ons"
              data-testid="missie-link"
              className="link-editorial mt-7 inline-block text-lg"
            >
              Over de stichting en het bestuur
            </Link>
          </Onthul>
        </div>
      </section>

      {/* De drie projecten — drie gelijke kolommen */}
      <section
        data-testid="projecten-section"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-44 top-10 text-rule opacity-[0.04]"
        >
          <Schakel className="h-[520px] w-auto -rotate-45" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <Onthul className="mx-auto max-w-2xl text-center">
            <p className="kicker text-magenta">De drie projecten</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Drie schakels, drie plekken in Bangalore
            </h2>
          </Onthul>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
            {projecten.map((project, idx) => (
              <Onthul key={project.slug} delay={idx * 120}>
                <article data-testid={`project-card-${project.slug}`}>
                  <Link href={project.href} className="group block">
                    <figure>
                      <div className="foto foto-diep relative aspect-[4/3]">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className={`object-cover ${project.positie ?? ""}`}
                        />
                      </div>
                    </figure>
                    <p
                      aria-hidden="true"
                      className={`mt-6 flex items-center gap-2.5 ${project.kleur}`}
                    >
                      <Schakel className="h-4 w-auto -rotate-45" />
                      <span className="font-display text-2xl font-bold leading-none">
                        {project.nummer}
                      </span>
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold leading-snug tracking-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-magenta">
                      {project.title}
                    </h3>
                    <p className="kicker mt-2 text-ink-2">{project.plaats}</p>
                    <p className="mt-3 leading-relaxed text-ink">
                      {project.beschrijving}
                    </p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                      {project.bijdrage}
                    </p>
                  </Link>
                </article>
              </Onthul>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/projecten"
              data-testid="projecten-all-link"
              className="pil border border-rule px-8 py-4 text-ink transition-colors hover:border-magenta hover:text-magenta"
            >
              Alle drie de projecten
            </Link>
          </div>
        </div>
      </section>

      {/* Verslagen — getint blok */}
      <section data-testid="nieuws-section" className="bg-paper-3">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <Onthul className="mx-auto max-w-2xl text-center">
            <p className="kicker text-magenta">{newsTitle}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Bezoekverslagen en berichten
            </h2>
          </Onthul>

          {nieuwsDrie.length === 0 ? (
            <p className="mt-10 text-center text-lg text-ink-2">
              Er zijn nog geen verslagen gepubliceerd.
            </p>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
              {nieuwsDrie.map((article, idx) => {
                const beeld =
                  article.featured_image ??
                  eersteAfbeelding(article.content_html);
                return (
                <Onthul key={article.id} delay={idx * 120}>
                  <Link
                    href={`/nieuws/${article.slug}`}
                    data-testid={idx === 0 ? "nieuws-featured-link" : undefined}
                    className="group block"
                  >
                    {beeld ? (
                      <figure>
                        <div className="foto relative aspect-[16/10]">
                          <Image
                            src={beeld}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
                            className="object-cover object-[50%_30%]"
                          />
                        </div>
                      </figure>
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex aspect-[16/10] items-center justify-center rounded-[14px] bg-ink/5 text-ink/30"
                      >
                        <Schakel className="h-10 w-auto -rotate-45" />
                      </div>
                    )}
                    <p className="kicker mt-5 text-ink-2">
                      {formatDutchDate(
                        article.published_at ?? article.created_at,
                      )}{" "}
                      · {decodeEntities(article.category?.name) || "Verslag"}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-magenta">
                      {decodeEntities(article.title)}
                    </h3>
                    {article.excerpt && (
                      <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-2">
                        {decodeEntities(article.excerpt)}
                      </p>
                    )}
                  </Link>
                </Onthul>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/nieuws"
              data-testid="nieuws-all-link"
              className="link-editorial text-lg"
            >
              Het volledige archief
            </Link>
          </div>
        </div>
      </section>

      {/* Doneer — donker blok */}
      <section
        data-testid="donatie-cta"
        className="relative overflow-hidden bg-ink text-paper"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 -right-36 text-paper opacity-[0.06]"
        >
          <Schakel className="h-[440px] w-auto -rotate-45" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <Onthul>
            <p className="kicker text-magenta-bright">Steunen</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Een gift komt zonder omwegen aan
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-paper/75">
              De stichting heeft geen kantoor en geen betaalde krachten.
              Giften zijn aftrekbaar; ANBI, RSIN 821887300.
            </p>
            <p className="mt-8 font-display text-2xl font-semibold tracking-wide sm:text-3xl">
              {donateIban}
            </p>
            <p className="mt-1 text-[1.0625rem] text-paper/75">
              t.n.v. {donateIbanName}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/steun-ons"
                data-testid="donatie-cta-button"
                className="pil bg-magenta px-8 py-4 text-paper hover:bg-magenta-deep"
              >
                Doneer
              </Link>
              <Link
                href="/belastingaftrek-schenkingen"
                className="text-[1.0625rem] text-paper underline decoration-paper/40 decoration-1 underline-offset-4 hover:decoration-paper"
              >
                Over belastingaftrek
              </Link>
            </div>
          </Onthul>
        </div>
      </section>
    </>
  );
}
