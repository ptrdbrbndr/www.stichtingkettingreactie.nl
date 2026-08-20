# Designrichting — redesign 2026 (v2)

Herzien op 20 augustus 2026 na afstemming: **het logo is het vaste anker**;
de look-and-feel volgt het logo (drie verweven kettingschakels in azuur,
indigo en magenta, plus een geometrisch kapitaal-woordmerk). De eerdere
warm-papier-richting (v1) is daarmee vervallen. Wie aan de publieke site
werkt, houdt zich aan deze richting; admin- en ledenschermen vallen er (nog)
buiten.

## De richting in vijf zinnen

1. De site is een helder magazine rond het logo: koel wit als grond, diep
   indigo als inkt- en lijnkleur, magenta als accent voor links, nummering en
   de doneer-route, en azuur uiterst spaarzaam voor meta en de arcering van
   het transparantie-element.
2. Koppen, labels, nummering en navigatie staan in Schibsted Grotesk, een
   moderne krantengrotesk die aansluit op het kapitale
   KETTINGREACTIE-woordmerk; broodtekst en verslagen blijven in Newsreader
   (krantenserif, optische maten) voor het reportagegevoel.
3. De editoriale structuur draagt de site: katernlijnen (nu indigo),
   folio-labels, asymmetrische leeskolommen op een twaalfkolomsgrid,
   fotografie full-bleed of grid-brekend met bijschriften, en de
   verantwoording (ANBI, RSIN 821887300, elke euro naar de projecten) als
   vast terugkerend kantlijn-element.
4. Het schakelmotief uit het logo komt subtiel terug op vaste plekken: als
   hoofdstukmarkering bij de drie projecten (elk hoofdstuk in de kleur van
   één schakel: I azuur, II indigo, III magenta) en als kleurenrij in het
   colofon.
5. Beweging beperkt zich tot één geregisseerde opening op de homepage
   (`.reveal`-klassen), daarna alleen hover-states; nergens kaarten,
   schaduwen, ronde hoeken of gradient-vlakken.

## Waarom deze fonts

- **Schibsted Grotesk** (Google Fonts): getekend voor het Noorse
  mediaconcern Schibsted, krantengrotesk met geometrische inslag en
  karakter op displayformaat. Sluit aan bij het strakke kapitale woordmerk
  zonder het te imiteren. Klassen: `.font-display` (koppen, nummering) en
  `.kicker` (gespatieerde kapitalen voor labels, meta, navigatie, knoppen).
- **Newsreader** (Google Fonts, variabel met `opsz`-as): rustige leesletter
  voor broodtekst, standfirsts en CMS-inhoud; echte cursief voor citaten.

## Tokens (globals.css)

| Token | Waarde | Gebruik |
| --- | --- | --- |
| `--color-paper` | `#fdfdfc` | paginagrond (koel wit) |
| `--color-paper-2` | `#f7f7fa` | verhoogd vlak (dropdown) |
| `--color-paper-3` | `#eff0f7` | katernvlak, strook |
| `--color-ink` | `#1e1750` | tekst, colofon-grond (diep indigo) |
| `--color-ink-2` | `#55517a` | secundaire tekst (AA op wit) |
| `--color-rule` / `--color-rule-soft` | `#251d66` / `#dcdaeb` | katernlijn / hulplijn |
| `--color-magenta` / `--color-magenta-deep` | `#be185d` / `#93134a` | accent, knoppen (AA) / hover |
| `--color-magenta-bright` | `#e83a8e` | logo-magenta, alleen groot/decoratief |
| `--color-azure` | `#0077b3` | kleine meta (AA op wit) |
| `--color-azure-bright` | `#0098de` | logo-azuur, decoratief + `.mark-azure` |

De `primary/accent/azure-50..900/cream`-tokens onderin `globals.css` zijn
legacy voor `/admin` en `/leden`; niet gebruiken in nieuwe publieke schermen.

## Vaste patronen

- `.folio`: 2px-katernlijn met label links (magenta) en meta rechts.
- Kantlijn-kolom (`lg:col-span-3 lg:col-start-10`) voor "Wat uw gift hier
  doet", sectienavigatie of de drukkersnoot met `.mark-azure`-arcering.
- Schakelmotief: component `Schakel` (`src/components/Schakel.tsx`),
  `-rotate-45`, kleur via currentColor. Alleen bij projecthoofdstukken en
  in het colofon.
- Fotobijschriften altijd via `.caption`, met plaats en context.
- Knoppen: rechthoekig, magenta-vlak (`bg-magenta`), `.kicker`-tekst. Eén
  primaire doneer-route per pagina.
- Links in lopende tekst: `.link-editorial` (onderstreept, magenta).

## Verboden (uit de redesign-briefing)

Inter/Roboto/Poppins/Montserrat/Space Grotesk/system-ui; paars- of
blauw-naar-paars-gradients, teal+oranje, gradient-tekst; gecentreerde
hero-met-twee-knoppen, drie-kaarten-grids, ronde kaarten met schaduw,
emoji- of lijn-icoon-decoratie (het schakelmotief is merkeigen en valt
hierbuiten), testimonial-carrousels; fade-in-alles bij scroll;
marketingfrasen en em-dashes in lopende tekst.
