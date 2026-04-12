import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Onze projecten",
  description:
    "Ontdek de drie projecten die Stichting Kettingreactie ondersteunt in India: Abayashram, UWA Working Women's Hostel en ASHA Foundation.",
};

const projecten = [
  {
    number: "01",
    title: "Abayashram",
    subtitle: "Vision India",
    tagline: "Opvang & rehabilitatie",
    description:
      "Een opvanghuis voor circa 45 geestelijk zieke vrouwen nabij Hoskote, even buiten Bangalore. Gerund door Joby Varghese en Vision India. De vrouwen krijgen medische en psychologische hulp en worden zo mogelijk gerehabiliteerd en herenigd met hun families.",
    href: "/projecten/abayashram",
    image: "/images/projecten/abayashram/vrouwen-abayashram.jpg",
  },
  {
    number: "02",
    title: "UWA Hostel",
    subtitle: "Working Women's Hostel",
    tagline: "Huisvesting & veiligheid",
    description:
      "Huisvesting voor jonge werkende vrouwen uit landelijke gebieden die naar Bangalore komen om te werken. Gerund door de University Women's Association Bangalore. Een veilige omgeving waar vrouwen kunnen wonen en zich ontwikkelen.",
    href: "/projecten/uwa-hostel",
    image: "/images/projecten/uwa-hostel/hostel-collage.jpg",
  },
  {
    number: "03",
    title: "ASHA Foundation",
    subtitle: "HIV-preventie & behandeling",
    tagline: "Medische zorg",
    description:
      "HIV-preventie en behandeling voor vrouwen, geleid door Dr. Glory Alexander. ART-medicatie voor circa 100 vrouwen en een PMTCT-programma om moeder-kind-overdracht van HIV te voorkomen.",
    href: "/projecten/asha-foundation",
    image: "/images/projecten/asha-foundation/dr-glory.jpg",
  },
];

export default function ProjectenPage() {
  return (
    <>
      <Hero
        eyebrow="Onze projecten"
        title="Drie initiatieven die we steunen"
        subtitle="Wij ondersteunen drie lokale projecten in en rondom Bangalore die zich inzetten voor vrouwen die de grootste kwetsbaarheid ervaren."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projecten", href: "/projecten" },
        ]}
      />

      {/* Editorial cards — alternerende layout */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 sm:space-y-28">
            {projecten.map((project, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <article
                  key={project.number}
                  className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
                >
                  {/* Image */}
                  <div
                    className={`relative lg:col-span-7 ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.subtitle}`}
                        width={1200}
                        height={900}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute font-serif text-[10rem] font-bold leading-none text-accent-600/20 select-none ${
                        isReversed
                          ? "-right-4 -top-16 sm:-right-10 sm:-top-24"
                          : "-left-4 -top-16 sm:-left-10 sm:-top-24"
                      }`}
                    >
                      {project.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div
                    className={`space-y-5 lg:col-span-5 ${
                      isReversed ? "lg:order-1" : ""
                    }`}
                  >
                    <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                      {project.tagline}
                    </span>
                    <h2 className="font-serif text-4xl font-bold leading-tight text-primary-600 sm:text-5xl">
                      {project.title}
                    </h2>
                    <p className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
                      {project.subtitle}
                    </p>
                    <p className="text-lg leading-relaxed text-ink-soft">
                      {project.description}
                    </p>
                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl"
                    >
                      Meer over {project.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
