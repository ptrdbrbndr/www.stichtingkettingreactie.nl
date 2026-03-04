import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Onze Projecten - Stichting Kettingreactie",
  description:
    "Ontdek de projecten die Stichting Kettingreactie ondersteunt in India: Abayashram, UWA Working Women's Hostel en ASHA Foundation.",
};

export default function ProjectenPage() {
  return (
    <>
      <Hero
        title="Onze Projecten"
        subtitle="Wij ondersteunen drie projecten in en rondom Bangalore die zich inzetten voor kansarme vrouwen."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="Abayashram – Vision India"
              description="Een opvanghuis voor circa 45 geestelijk zieke vrouwen nabij Hoskote, even buiten Bangalore. Gerund door Joby Varghese en Vision India. De vrouwen krijgen medische en psychologische hulp en worden zo mogelijk gerehabiliteerd en herenigd met hun families."
              href="/projecten/abayashram"
              image="/images/projecten/abayashram/vrouwen-abayashram.jpg"
              imageAlt="Vrouwen bij Abayashram"
            />
            <ProjectCard
              title="UWA – Working Women's Hostel"
              description="Huisvesting voor jonge werkende vrouwen uit landelijke gebieden die naar Bangalore komen om te werken. Gerund door de University Women's Association Bangalore. Een veilige omgeving waar vrouwen kunnen wonen en zich ontwikkelen."
              href="/projecten/uwa-hostel"
              image="/images/projecten/uwa-hostel/hostel-collage.jpg"
              imageAlt="UWA Working Women's Hostel"
            />
            <ProjectCard
              title="ASHA Foundation"
              description="HIV-preventie en behandeling voor vrouwen, geleid door Dr. Glory Alexander. ART-medicatie voor circa 100 vrouwen en een PMTCT-programma om moeder-kind-overdracht van HIV te voorkomen. Kan circa 5.000 zwangere vrouwen testen in zes maanden."
              href="/projecten/asha-foundation"
              image="/images/projecten/asha-foundation/dr-glory.jpg"
              imageAlt="Dr. Glory Alexander van ASHA Foundation"
            />
          </div>
        </div>
      </section>
    </>
  );
}
