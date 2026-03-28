# Stappenplan Website — Stichting Kettingreactie

Opgesteld op basis van opmerkingen van Sytze Hoekstra (27-03-2026).

---

## Stap 1 — Footer: Logo's toevoegen

**Wat:** Twee logo's toevoegen in de footer.

- [x] Logo van **Stichting Kettingreactie** opnemen in de footer, met link naar de homepage (`/`)
- [x] Logo van **ANBI** opnemen in de footer — SVG-badge aangemaakt (`public/images/logos/anbi-logo.svg`); vervangen door officieel logo zodra Belastingdienst dit aanlevert

**Waar in de code:** `src/components/Footer.tsx` (of equivalent)

---

## Stap 2 — Projectpagina's: Links naar lokale organisaties

**Wat:** Op de pagina's van de drie projecten een link opnemen naar de lokale partnerorganisatie.

- [ ] **Abayashram** — link naar website van Abayashram toevoegen
- [ ] **UWA Working Women's Hostel** — link naar UWA-organisatie toevoegen
- [ ] **ASHA Foundation** — link naar ASHA Foundation website toevoegen

**Benodigdheid:** Juiste URL's opvragen bij het bestuur.

**Waar in de code:**
- `src/app/projecten/abayashram/page.tsx`
- `src/app/projecten/uwa-hostel/page.tsx`
- `src/app/projecten/asha-foundation/page.tsx`

---

## Stap 3 — Nieuws: Historisch materiaal verwerken

**Wat:** Oude nieuwsberichten en nieuwsbrieven ophalen uit de oude website en opnemen in het CMS.

- [ ] Bestuur vragen om archiefmateriaal (nieuwsbrieven, berichten) aan te leveren — Pieter heeft geen toegang meer tot de oude site
- [ ] Per bericht beoordelen of het herschreven/samengevat moet worden voor de huidige toon
- [ ] Berichten invoeren via het CMS-admin (`/admin/posts`) met correcte datum (terugdateerbaar)
- [ ] Controleren of categorieën/tags kloppen (bijv. "Nieuws 2022", "Nieuwsbrief")

**Opmerking Sytze:** "vergt wellicht wat herschrijven" — neem dit serieus; verouderde formuleringen of afbeeldingen updaten.

---

## Stap 4 — Meer foto's op inhoudspagina's

**Wat:** Extra afbeeldingen toevoegen op drie pagina's.

- [ ] **Over Ons** — 1 of 2 sfeerbeelden toevoegen (bijv. bestuur, activiteiten)
- [ ] **Steun Ons** — 1 of 2 impactfoto's toevoegen
- [ ] **Verantwoording** — 1 of 2 foto's toevoegen (bijv. projectbezoek, overhandiging)

**Benodigdheid:** Foto's aanleveren via het bestuur (bij voorkeur hoge resolutie, portrait of landscape).

---

## Stap 5 — Grote gekleurde balken: Afbeelding erin?

**Wat:** Beoordelen of een foto in de rood/paarse hero-balken werkt op mobiel.

- [ ] Prototype maken met een achtergrondafbeelding in één van de gekleurde secties
- [ ] **Testen op smal scherm** (320px–390px) — werkt de leesbaarheid van de tekst nog?
- [ ] Beslissing voorleggen aan Sytze/bestuur op basis van het prototype
- [ ] Indien akkoord: alle vergelijkbare balken consistent aanpassen

**Advies vooraf:** Gebruik een `overlay` (donkere transparante laag over de foto) zodat tekst altijd leesbaar blijft op mobiel.

---

## Stap 6 — Reageren door bezoekers (optioneel, nader te besluiten)

**Wat:** Mogelijkheid voor bezoekers om te reageren op nieuws of pagina's.

**Vraag van Sytze:** "Willen we dit?" — dit is een bestuursbeslissing vanwege de moderatielast.

- [ ] **Eerst beslissing bestuur:** wil men een reactiemogelijkheid, en wie modereert?
- [ ] Opties:
  - Reacties bij nieuwsberichten (CMS-functionaliteit uitbreiden)
  - Contactformulier als alternatief (minder moderatie)
  - Guestbook/fotoalbum-reacties (beperkt bereik)
- [ ] Na bestuursbeslissing: technische implementatie plannen

**Aanbeveling:** Begin met een eenvoudig **contactformulier** op de nieuwspagina's als tussenoplossing — laagdrempelig en geen dagelijkse moderatie vereist.

---

## Prioritering (voorstel)

| # | Stap | Inspanning | Afhankelijkheid |
|---|------|-----------|----------------|
| 1 | Footer logo's | Klein | ANBI-logo ophalen |
| 2 | Links lokale organisaties | Klein | URL's bestuur |
| 4 | Foto's op pagina's | Klein-Middel | Foto's bestuur |
| 3 | Historisch nieuws | Middel-Groot | Archiefmateriaal bestuur |
| 5 | Foto's in gekleurde balken | Middel | Prototype + goedkeuring |
| 6 | Reactiemogelijkheid | PM | Bestuursbeslissing eerst |

---

## Actiepunten voor het bestuur

Voordat stappen 2, 3 en 4 opgepakt kunnen worden, zijn de volgende zaken nodig van het bestuur:

1. **URL's** van de drie partnerorganisaties (Abayashram, UWA, ASHA)
2. **Archiefmateriaal**: nieuwsbrieven en -berichten van vóór de huidige site
3. **Foto's** voor Over Ons, Steun Ons en Verantwoording
4. **Beslissing** over reactiemogelijkheid voor bezoekers
