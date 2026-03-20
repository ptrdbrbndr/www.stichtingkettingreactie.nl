import type { Metadata } from "next";
import Link from "next/link";
import { Heart, HandHeart, ArrowRight, Users, Globe, CheckCircle } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import BlogPostCard from "@/components/BlogPostCard";
import { createClient } from "@/lib/supabase/server";
import { getHomepageConfig, getArticles } from "@ptrdbrbndr/cms";

export const metadata: Metadata = {
  title: "Stichting Kettingreactie - Samen voor kansarme vrouwen in India",
  description:
    "Stichting Kettingreactie zet zich in voor het verbeteren van de positie van kansarme vrouwen in India door lokale initiatieven te ondersteunen.",
};

export default async function HomePage() {
  const supabase = await createClient();

  const [config, { articles: latestNews }] = await Promise.all([
    getHomepageConfig(supabase),
    getArticles(supabase, {
      status: "published",
      orderBy: "published_at",
      orderDirection: "desc",
      limit: 9,
    }),
  ]);

  const heroTitle = config?.hero_title ?? "Samen voor kansarme vrouwen in India";
  const heroSubtitle = config?.hero_subtitle ?? "Stichting Kettingreactie ondersteunt lokale initiatieven die het leven van kansarme vrouwen in India verbeteren. Samen maken wij het verschil.";
  const heroCta = config?.hero_cta_text ?? "Steun ons";
  const heroCtaHref = config?.hero_cta_href ?? "/steun-ons";
  const missionTitle = config?.mission_title ?? "Het verbeteren van de positie van kansarme vrouwen in India";
  const missionText = config?.mission_text ?? "Stichting Kettingreactie zet zich in voor het verbeteren van de positie van kansarme vrouwen in India. Wij doen dit door lokale initiatieven in India te ondersteunen met fondsenwerving in Nederland. Elke gedoneerde euro gaat volledig naar de projecten.";
  const projectsTitle = config?.projects_title ?? "Waar wij ons voor inzetten";
  const projectsSubtitle = config?.projects_subtitle ?? "Wij ondersteunen drie projecten in en rondom Bangalore, India.";
  const newsBadge = config?.news_badge ?? "Laatste Nieuws";
  const newsTitle = config?.news_title ?? "Blijf op de hoogte";
  const donateTitle = config?.donate_title ?? "Steun ons werk";
  const donateText = config?.donate_text ?? "Elke donatie maakt een verschil. 100% van uw gift gaat direct naar de projecten in India. U kunt doneren via onze bankrekening.";
  const donateIban = config?.donate_iban ?? "NL87 INGB 0005313860";
  const donateIbanName = config?.donate_iban_name ?? "Stichting Kettingreactie Amsterdam";
  const newsLimit = config?.news_limit ?? 3;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-accent-700">
        {/* Decoratief patroon */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* Subtiele cirkel decoratie */}
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white opacity-5"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent-400 opacity-10"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            ANBI-erkende stichting
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={heroCtaHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-xl"
            >
              <Heart className="h-5 w-5" />
              {heroCta}
            </Link>
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/70 hover:bg-white/10"
            >
              Onze projecten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact statistieken */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="flex flex-col items-center py-8 text-center sm:py-10">
              <span className="text-2xl font-bold text-primary-700 sm:text-3xl">3</span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm">Projecten in India</span>
            </div>
            <div className="flex flex-col items-center py-8 text-center sm:py-10">
              <span className="text-2xl font-bold text-primary-700 sm:text-3xl">100%</span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm">Naar de projecten</span>
            </div>
            <div className="flex flex-col items-center py-8 text-center sm:py-10">
              <span className="text-2xl font-bold text-primary-700 sm:text-3xl">ANBI</span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm">Erkend door Belastingdienst</span>
            </div>
          </div>
        </div>
      </section>

      {/* Onze Missie */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Tekst */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
                <Heart className="h-3.5 w-3.5" />
                Onze Missie
              </div>
              <h2 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
                {missionTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                {missionText}
              </p>
              <Link
                href="/over-ons"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                Meer over ons verhaal
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Visueel blok */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-primary-50 p-6">
                <Users className="mb-3 h-7 w-7 text-primary-600" />
                <p className="text-sm font-semibold text-gray-900">Lokale initiatieven</p>
                <p className="mt-1 text-sm text-gray-500">Samenwerking met lokale organisaties in Bangalore</p>
              </div>
              <div className="rounded-2xl bg-accent-50 p-6">
                <Globe className="mb-3 h-7 w-7 text-accent-600" />
                <p className="text-sm font-semibold text-gray-900">Directe impact</p>
                <p className="mt-1 text-sm text-gray-500">Elke euro gaat rechtstreeks naar de projecten</p>
              </div>
              <div className="col-span-2 rounded-2xl bg-gray-50 p-6">
                <CheckCircle className="mb-3 h-7 w-7 text-green-600" />
                <p className="text-sm font-semibold text-gray-900">Transparante verantwoording</p>
                <p className="mt-1 text-sm text-gray-500">Wij leggen volledig verantwoording af over besteding van donaties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onze Projecten */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              Onze Projecten
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {projectsTitle}
            </h2>
            <p className="mt-4 text-gray-600">{projectsSubtitle}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="Abayashram – Vision India"
              description="Een opvanghuis voor geestelijk zieke vrouwen nabij Bangalore. Hier krijgen zij medische en psychologische hulp en een veilig onderkomen."
              href="/projecten/abayashram"
              image="/images/projecten/abayashram/vrouwen-abayashram.jpg"
              imageAlt="Vrouwen bij Abayashram"
            />
            <ProjectCard
              title="UWA – Working Women's Hostel"
              description="Huisvesting voor jonge werkende vrouwen uit landelijke gebieden die naar Bangalore komen om te werken. Een veilige plek om te wonen."
              href="/projecten/uwa-hostel"
              image="/images/projecten/uwa-hostel/hostel-collage.jpg"
              imageAlt="UWA Working Women's Hostel"
            />
            <ProjectCard
              title="ASHA Foundation"
              description="HIV-preventie en behandeling voor vrouwen. Medicatie voor weduwen en jonge HIV-positieve vrouwen, en een programma om moeder-kind-overdracht te voorkomen."
              href="/projecten/asha-foundation"
              image="/images/projecten/asha-foundation/dr-glory.jpg"
              imageAlt="Dr. Glory Alexander van ASHA Foundation"
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 px-6 py-2.5 text-sm font-semibold text-primary-700 transition-all hover:bg-primary-700 hover:text-white hover:border-primary-700"
            >
              Bekijk alle projecten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Laatste Nieuws */}
      {latestNews.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-3 inline-flex rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
                  {newsBadge}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {newsTitle}
                </h2>
              </div>
              <Link
                href="/nieuws"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              >
                Alle berichten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestNews.slice(0, newsLimit).map((article) => (
                <BlogPostCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt ?? ""}
                  slug={article.slug}
                  date={article.published_at ?? article.created_at}
                  category={article.category?.name}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Steun Ons CTA */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-accent-700 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <HandHeart className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {donateTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
            {donateText}
          </p>
          <div className="mt-8 inline-block rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-sm">
            <p className="font-mono text-xl font-bold text-white">
              {donateIban}
            </p>
            <p className="mt-1 text-sm text-white/60">
              t.n.v. {donateIbanName}
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/steun-ons"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-xl"
            >
              <Heart className="h-5 w-5" />
              Meer over doneren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
