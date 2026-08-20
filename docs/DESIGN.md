# Designrichting — redesign 2026

Vastgelegd bij het redesign van 20 augustus 2026 (commit 0f84438). Wie aan de
publieke site werkt, houdt zich aan deze richting; de admin- en ledenschermen
vallen er (nog) buiten.

## De richting in vijf zinnen

1. De site is opgezet als het jaarverslag-katern van een kleine stichting:
   gebroken-wit papier, zwarte hairlines als katernlijnen, folio-labels per
   katern en de verantwoording (ANBI, RSIN 821887300, elke euro naar de
   projecten) als vaste drukkersnoot die op elke pagina terugkeert.
2. Typografie draagt het ontwerp: Newsreader op displayformaat voor koppen,
   dezelfde familie op tekstoptische maat voor broodtekst, en Libre Franklin
   in gespatieerde kapitalen voor labels, meta en navigatie.
3. Kleur blijft bij papier en inkt met één accent uit Indiase textiel:
   meekrap-rood voor nummering, links en de doneer-route, en een spaarzame
   kurkuma-arcering uitsluitend voor het transparantie-element.
4. De layout is asymmetrisch-editoriaal: verspringende leeskolommen op een
   twaalfkolomsgrid, foto's die full-bleed of over de kolomgrens breken met
   bijschriften van plaats en context, en nergens kaarten, schaduwen of
   ronde hoeken.
5. Beweging beperkt zich tot één geregisseerde opening op de homepage
   (`.reveal`-klassen), daarna alleen hover-states.

## Waarom deze fonts

- **Newsreader** (Google Fonts, variabel met `opsz`-as): getekend voor
  krantenwerk. Op 40 px en groter worden de contrastrijke details scherp en
  karaktervol, op 17 px is het een rustige leesletter. Eén familie voor kop
  én broodtekst houdt de pagina samenhangend; de optische-maat-as doet het
  onderscheid. Echte cursief beschikbaar voor citaten.
- **Libre Franklin**: het Franklin Gothic-erfgoed, de klassieke Amerikaanse
  krantengrotesk. In kleine gespatieerde kapitalen (klasse `.kicker`) voor
  folio's, datums, knoppen en navigatie. Nadrukkelijk niet als broodletter.

## Tokens (globals.css)

| Token | Waarde | Gebruik |
|---|---|---|
| `--color-paper` | `#f5f0e6` | paginagrond |
| `--color-paper-2` | `#faf7ef` | verhoogd vlak (dropdown) |
| `--color-paper-3` | `#ece4d2` | katern-achtergrond, strook |
| `--color-ink` | `#211d15` | tekst, hairlines, colofon-grond |
| `--color-ink-2` | `#57503f` | secundaire tekst (AA op paper) |
| `--color-rule` / `--color-rule-soft` | `#211d15` / `#d8cfba` | katernlijn / hulplijn |
| `--color-madder` / `--color-madder-deep` | `#9a3222` / `#782416` | accent / hover |
| `--color-turmeric` | `#e0a93e` | alleen `.mark-turmeric`-arcering |

De `primary/accent/azure/cream`-tokens onderin `globals.css` zijn legacy voor
`/admin` en `/leden`; niet gebruiken in nieuwe publieke schermen en pas
verwijderen wanneer die schermen zijn omgezet.

## Vaste patronen

- `.folio`: 2px-katernlijn met label links (meekrap) en meta rechts.
- Kantlijn-kolom (`lg:col-span-3 lg:col-start-10`) voor "Wat uw gift hier
  doet", sectienavigatie of de drukkersnoot.
- Fotobijschriften altijd via `.caption` (Franklin, hulplijn erboven), met
  plaats en context; nooit een foto zonder bijschrift op contentpagina's.
- Knoppen: rechthoekig, meekrap-vlak, `.kicker`-tekst. Eén primaire
  doneer-route per pagina.
- Links in lopende tekst: `.link-editorial` (onderstreept, meekrap).

## Verboden (uit de redesign-briefing)

Inter/Roboto/Poppins/Montserrat/Space Grotesk/system-ui; paars- of
blauw-naar-paars-gradients, teal+oranje, gradient-tekst; gecentreerde
hero-met-twee-knoppen, drie-kaarten-grids, ronde kaarten met schaduw,
emoji- of lijn-icoon-decoratie, testimonial-carrousels; fade-in-alles bij
scroll; marketingfrasen en em-dashes in lopende tekst.
