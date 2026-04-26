# Security Baseline — Stichting Kettingreactie

**Privacy-niveau: MIDDEN**
Charity-website met admin-CMS, donatieverwerking en publieke content. Verwerkt donateur-data en admin-gebruikersaccounts. Donaties via externe processor.

**Relevante normen**: OWASP ASVS Level 1, AVG, PCI-DSS (donaties via extern)

---

> **Doc-revalidatie — 2026-04-26.** Deze baseline was laatst bijgewerkt op 2026-04-02 (commit c292245). Sindsdien zijn de volgende functies gepushed die de scope verbreden — bevestig per status-cel via code-review vóór externe oplevering:
>
> - WP-content-migratie naar Supabase + dynamische `/[slug]` page route (commit 668c87e) — uitgebreider angle-of-attack via publieke pagina-rendering vanuit Supabase
> - Redirects voor oude WP hiërarchische page-paths (commit 68f14ff) — verifieer redirect-handling tegen open-redirect-misbruik
> - WP-hiërarchische navigatie met dropdown sub-menus (commit ec65800)
> - Editorial redesign + featured-article-blok (commits c11dcaa, dd5f2d4)
> - HTML-entities decoden in subpage-rendering (commit 07090e0) — let bij externe pre-flight op XSS via WP-import-content (gedecodeerde HTML uit Supabase mag niet als raw `dangerouslySetInnerHTML` belanden zonder sanitatie)
> - Supabase Storage hostname toegevoegd aan `next.config` images.remotePatterns (commit cfcfe4e)
>
> Inhoudelijke regels (MIDDEN-niveau, OWASP ASVS L1, AVG, PCI-DSS) blijven geldig. Per memory-context: WordPress draait parallel als productie op mijn.host; Next.js-herbouw staat op staging op Vercel tot cutover. Status-cellen hieronder zijn niet stuk-voor-stuk geverifieerd in deze revalidatie — pak een code-review-pass vóór externe audit of cutover.

---

## Profiel

| Eigenschap | Waarde |
|------------|--------|
| Type | Next.js + Supabase CMS + donaties |
| Auth | Supabase Auth (admin login) |
| Database | Supabase PostgreSQL |
| Externe diensten | Supabase, Vercel, betaalprocessor (via `/api/donate`) |
| Hosting | Vercel |
| Persoonsgegevens | Admin e-mail, donateur-data (naam, bedrag, datum) |
| Bewaartermijn | Donaties: fiscale bewaarplicht 7 jaar; accounts: zolang actief |

---

## Status overzicht

### Authenticatie & Admin

| Item | Eis | Status |
|------|-----|--------|
| Admin-routes beschermd | `/admin/*` vereist ingelogde sessie | ⚠️ middleware verifiëren |
| Admin-login beveiligd | Geen standaardwachtwoord, MFA aanbevolen | ⚠️ controleren |
| Geen publieke admin-endpoints | Alle mutaties vereisen auth | ⚠️ API routes controleren |
| Login-pogingen gelogd | Mislukte logins server-side gelogd | ⚠️ |

### Donatie-API (`/api/donate`)

| Item | Eis | Status |
|------|-----|--------|
| Input validatie | Bedrag, naam en e-mail gevalideerd | ⚠️ controleren |
| Betalingsdata niet opgeslagen | Geen kaartdata of bankrekeningen in eigen DB | ✅ (extern via betaalprocessor) |
| Rate limiting | Max X donaties per IP per uur | ⚠️ implementeren |
| Webhook validatie | Betaalprocessor webhook verifieert handtekening | ⚠️ controleren |
| Geen stack traces in response | Foutmeldingen generiek voor client | ⚠️ |

### CMS (TipTap + Supabase)

| Item | Eis | Status |
|------|-----|--------|
| Rich text gesaniteerd vóór opslag | Geen XSS via TipTap-output | ⚠️ implementeren |
| Media-upload validatie | Type (whitelist) + grootte (max 10 MB) server-side | ⚠️ |
| RLS op content-tabellen | Alleen admins mogen schrijven | ⚠️ verifiëren |
| Publieke content read-only | Bezoekers kunnen niets schrijven | ✅ (geen publieke mutaties) |

### Database & RLS

| Item | Eis | Status |
|------|-----|--------|
| RLS ingeschakeld | Admin-tabellen, donaties | ⚠️ verifiëren |
| Service role key server-side | Nooit in client bundle | ✅ |

### Privacy (AVG)

| Item | Eis | Status |
|------|-----|--------|
| Privacyverklaring | Vermeldt verwerking donateur-data | ⚠️ controleren/toevoegen |
| Donateur-data bewaartermijn | 7 jaar fiscale bewaarplicht gedocumenteerd | ⚠️ |
| Account verwijdering admin | Admin-accounts verwijderbaar | ⚠️ |
| Geen PII in URL's | Donateur-data niet in querystring | ✅ |

### Infrastructuur

| Item | Eis | Status |
|------|-----|--------|
| HTTPS | TLS via Vercel | ✅ |
| Security headers | CSP, X-Frame-Options | ⚠️ instellen |
| Secrets via .env | Geen hardcoded keys | ✅ |

---

## Prioriteit actielijst

1. **KRITIEK** — Admin-routes beveiligen: middleware + RLS op admin-tabellen
2. **HOOG** — Donatie-API: input validatie + rate limiting
3. **HOOG** — TipTap HTML-output saniteren vóór opslag (XSS-preventie)
4. **HOOG** — Media-upload validatie: type-whitelist + grootte-limiet
5. **MEDIUM** — Webhook-validatie betaalprocessor implementeren
6. **MEDIUM** — Security headers toevoegen
7. **MEDIUM** — Privacyverklaring controleren op volledigheid (donateur-data, bewaarplicht)
8. **LAAG** — Login-pogingen loggen

---

## Bedreigingsmodel

| Bedreiging | Impact | Kans | Mitigatie |
|------------|--------|------|-----------|
| Ongeautoriseerde admin-toegang | Kritiek | Medium | Auth middleware + RLS |
| XSS via CMS-content | Hoog | Medium | TipTap output saniteren |
| Malicious file upload | Hoog | Medium | Type/grootte validatie |
| Donatie-fraude via API | Hoog | Medium | Rate limiting + webhook validatie |
| Donateur-data lek | Hoog | Laag | RLS + toegangslogging |
| Betaaldata in eigen DB | Kritiek | Laag | Alleen extern (betaalprocessor) |
