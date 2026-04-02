# Security Baseline — Stichting Kettingreactie

**Privacy-niveau: MIDDEN**
Charity-website met admin-CMS, donatieverwerking en publieke content. Verwerkt donateur-data en admin-gebruikersaccounts. Donaties via externe processor.

**Relevante normen**: OWASP ASVS Level 1, AVG, PCI-DSS (donaties via extern)

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
