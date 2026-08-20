import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Onthul from "@/components/Onthul";
import Schakel from "@/components/Schakel";

export const metadata: Metadata = {
  title: "De drie projecten",
  description:
    "Stichting Kettingreactie financiert drie projecten in en rondom Bangalore: Abayashram, het UWA Working Women's Hostel en de ASHA Foundation.",
};

const projecten = [
  {
    nummer: "I",
    kleur: "text-azure-bright",
    aspect: "aspect-[3/2]",
    positie: "",
    title: "Abayashram",
    plaats: "Hoskote, bij Bangalore",
    organisatie: "Vision India, Joby Varghese",
    beschrijving:
      "Een opvanghuis voor circa 45 vrouwen met ernstige psychische problemen, van wie velen op straat zijn gevonden of door hun familie zijn achtergelaten. Zij krijgen onderdak, medische en psychologische zorg en waar het kan hereniging met hun familie. Wie niet terug kan, blijft: Abayashram is dan een blijvend thuis.",
    href: "/projecten/abayashram",
    image: "/images/projecten/abayashram/vrouwen-abayashram.jpg",
    imageAlt: "Vrouwen van Abayashram, Hoskote",
  },
  {
    nummer: "II",
    kleur: "text-[#2f2483]",
    aspect: "aspect-[4/3]",
    positie: "object-[50%_30%]",
    title: "UWA Working Women's Hostel",
    plaats: "Bangalore",
    organisatie: "University Women's Association Bangalore",
    beschrijving:
      "Betaalbare en veilige huisvesting voor jonge vrouwen die vanuit dorpen naar Bangalore komen om te werken. Voor de meesten is het de eerste keer buiten hun dorp; in een stad als Bangalore is veilige woonruimte voor alleenstaande jonge vrouwen moeilijk te vinden. Veel bewoners ondersteunen met hun inkomen hun familie op het platteland.",
    href: "/projecten/uwa-hostel",
    image: "/images/projecten/uwa-hostel/girls-audience.jpg",
    imageAlt: "Bewoonsters van het UWA-hostel tijdens een bijeenkomst",
  },
  {
    nummer: "III",
    kleur: "text-magenta-bright",
    aspect: "aspect-[3/2]",
    positie: "object-[50%_35%]",
    title: "ASHA Foundation",
    plaats: "Bangalore",
    organisatie: "Dr. Glory Alexander",
    beschrijving:
      "HIV-zorg voor vrouwen: ART-medicatie voor circa 100 vrouwen, vooral weduwen en jonge HIV-positieve vrouwen, en een PMTCT-programma dat per half jaar zo'n 5.000 zwangere vrouwen test om overdracht van moeder op kind te voorkomen. Ongeveer 1% test positief; met tijdige behandeling wordt overdracht op de baby vrijwel altijd voorkomen.",
    href: "/projecten/asha-foundation",
    image: "/images/projecten/asha-foundation/dr-glory.jpg",
    imageAlt: "Dr. Glory Alexander van de ASHA Foundation",
  },
];

export default function ProjectenPage() {
  return (
    <>
      <Hero
        eyebrow="Katern · Projecten"
        title="Drie projecten, drie hoofdstukken"
        subtitle="De stichting financiert drie lokale organisaties in en rondom Bangalore. Elk hoofdstuk beschrijft wat het project doet, wie het runt en wat de stichting er financiert."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projecten", href: "/projecten" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="space-y-20 border-t-2 border-rule pt-14 sm:space-y-28">
          {projecten.map((project, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <Onthul key={project.nummer}>
              <article className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-0">
                <div
                  className={`lg:col-span-7 ${
                    reversed ? "lg:order-2 lg:col-start-6" : ""
                  }`}
                >
                  <figure>
                    <div
                      className={`foto foto-diep relative ${project.aspect}`}
                    >
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className={`object-cover ${project.positie}`}
                      />
                    </div>
                    <figcaption className="caption">
                      {project.imageAlt}
                    </figcaption>
                  </figure>
                </div>
                <div
                  className={`lg:col-span-4 ${
                    reversed
                      ? "lg:order-1 lg:col-start-1 lg:pr-10"
                      : "lg:col-start-9 lg:pl-2"
                  }`}
                >
                  <p
                    aria-hidden="true"
                    className={`flex items-center gap-3 ${project.kleur}`}
                  >
                    <Schakel className="h-6 w-auto -rotate-45" />
                    <span className="font-display text-6xl font-bold leading-none">
                      {project.nummer}
                    </span>
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink">
                    {project.title}
                  </h2>
                  <p className="kicker mt-3 text-ink-2">
                    {project.plaats} · {project.organisatie}
                  </p>
                  <p className="mt-5 font-serif text-lg leading-relaxed text-ink">
                    {project.beschrijving}
                  </p>
                  <Link
                    href={project.href}
                    className="link-editorial mt-6 inline-block font-serif text-lg"
                  >
                    Lees hoofdstuk {project.nummer}
                  </Link>
                </div>
              </article>
              </Onthul>
            );
          })}
        </div>
      </section>
    </>
  );
}
