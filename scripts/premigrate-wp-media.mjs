/**
 * Pre-migratie voor migrate-wp.mjs tegen een verse Supabase:
 *
 * 1. Haalt alle WP-media op (incl. size-varianten), downloadt elk bestand en
 *    uploadt het naar Storage-bucket `wp-uploads` (zelfde relatieve pad als
 *    wp-content/uploads). Vult de `media`-tabel (filename -> url) die
 *    migrate-wp.mjs gebruikt voor URL-rewrites.
 * 2. Haalt WP-categorieën en -tags op, upsert ze in `categories`/`tags` en
 *    schrijft de wp_id->uuid mapping naar TAX_MAPPING_PATH.
 *
 * Zet UPLOADS_DIR naar een lokale spiegel van wp-content/uploads (gemaakt met
 * mirror-wp-uploads.mjs) om de bestanden lokaal te lezen in plaats van ze per
 * stuk van de site te downloaden — bulk-downloads over HTTPS triggeren de
 * mijn.host-WAF, die dan het hele IP blokkeert (incident 19-21 aug 2026).
 *
 * Run:
 *   SUPABASE_URL=https://... SUPABASE_SERVICE_KEY=... \
 *   UPLOADS_DIR=c:/tmp/skr-uploads \
 *   TAX_MAPPING_PATH=/pad/skr-tax-mapping.json node scripts/premigrate-wp-media.mjs
 */

import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const UPLOADS_DIR = process.env.UPLOADS_DIR;
const TAX_MAPPING_PATH =
  process.env.TAX_MAPPING_PATH ?? "c:/tmp/skr-tax-mapping.json";
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("SUPABASE_URL en SUPABASE_SERVICE_KEY env vars vereist");
  process.exit(1);
}
const WP_BASE = "https://stichtingkettingreactie.nl/wp-json/wp/v2";
const BUCKET = "wp-uploads";
const UPLOADS_MARKER = "/wp-content/uploads/";

const sbHeaders = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
};

async function fetchAllWP(endpoint, extra = "") {
  const all = [];
  let page = 1;
  while (true) {
    const r = await fetch(
      `${WP_BASE}/${endpoint}?per_page=100&page=${page}${extra}`,
    );
    if (r.status === 400) break;
    if (!r.ok) throw new Error(`WP ${endpoint} p${page}: ${r.status}`);
    const items = await r.json();
    if (items.length === 0) break;
    all.push(...items);
    if (items.length < 100) break;
    page++;
  }
  return all;
}

function relPath(url) {
  const i = url.indexOf(UPLOADS_MARKER);
  if (i === -1) return null;
  return decodeURIComponent(url.slice(i + UPLOADS_MARKER.length).split("?")[0]);
}

// Leest uit de lokale UPLOADS_DIR-spiegel als die er is; alleen bestanden die
// daar ontbreken komen nog per HTTP van de site (WAF-risico, dus log het).
async function readUpload(rel, srcUrl) {
  if (UPLOADS_DIR) {
    const local = path.join(UPLOADS_DIR, rel);
    if (fs.existsSync(local)) return fs.readFileSync(local);
    console.warn(`  ~ ${rel}: niet in UPLOADS_DIR, val terug op HTTP`);
  }
  const dl = await fetch(srcUrl);
  if (!dl.ok) throw new Error(`download ${srcUrl}: ${dl.status}`);
  return Buffer.from(await dl.arrayBuffer());
}

async function uploadFile(rel, srcUrl, mime) {
  const buf = await readUpload(rel, srcUrl);
  const up = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURI(rel)}`,
    {
      method: "POST",
      headers: {
        ...sbHeaders,
        "Content-Type": mime || "application/octet-stream",
        "x-upsert": "true",
      },
      body: buf,
    },
  );
  if (!up.ok) throw new Error(`upload ${rel}: ${up.status} ${await up.text()}`);
  return buf.length;
}

async function upsertMediaRow(rel, mime, size) {
  const row = {
    filename: rel,
    storage_path: `${BUCKET}/${rel}`,
    url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURI(rel)}`,
    mime_type: mime || null,
    size_bytes: size,
  };
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/media?on_conflict=storage_path`,
    {
      method: "POST",
      headers: {
        ...sbHeaders,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(row),
    },
  );
  if (!r.ok) throw new Error(`media row ${rel}: ${r.status} ${await r.text()}`);
}

function decode(s) {
  if (!s) return s;
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&quot;/g, '"');
}

async function upsertTaxonomy(table, items) {
  const map = {};
  for (const it of items) {
    const payload = { name: decode(it.name), slug: it.slug };
    if (table === "categories" && it.description)
      payload.description = it.description;
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?on_conflict=slug`,
      {
        method: "POST",
        headers: {
          ...sbHeaders,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify(payload),
      },
    );
    if (!r.ok)
      throw new Error(`${table} ${it.slug}: ${r.status} ${await r.text()}`);
    const [row] = await r.json();
    map[it.id] = row.id;
  }
  return map;
}

async function main() {
  console.log("=== WP media ===");
  const media = await fetchAllWP("media");
  console.log(`  ${media.length} media items`);
  let ok = 0,
    fail = 0;
  for (const m of media) {
    // origineel + alle size-varianten, zodat rewriteUrls elke verwijzing vindt
    const variants = new Map();
    const origRel = relPath(m.source_url ?? "");
    if (origRel)
      variants.set(origRel, {
        url: m.source_url,
        mime: m.mime_type,
      });
    for (const s of Object.values(m.media_details?.sizes ?? {})) {
      const rel = relPath(s.source_url ?? "");
      if (rel && !variants.has(rel))
        variants.set(rel, { url: s.source_url, mime: s.mime_type });
    }
    for (const [rel, v] of variants) {
      try {
        const size = await uploadFile(rel, v.url, v.mime);
        await upsertMediaRow(rel, v.mime, size);
        ok++;
      } catch (e) {
        fail++;
        console.error(`  ! ${rel}: ${e.message?.slice(0, 160)}`);
      }
    }
    if ((ok + fail) % 25 === 0) console.log(`  ... ${ok} ok, ${fail} fail`);
  }
  console.log(`  bestanden: ok=${ok} fail=${fail}`);

  console.log("\n=== WP taxonomie ===");
  const cats = await fetchAllWP("categories");
  const tags = await fetchAllWP("tags");
  const categories = await upsertTaxonomy(
    "categories",
    cats.filter((c) => c.slug !== "uncategorized"),
  );
  const tagMap = await upsertTaxonomy("tags", tags);
  fs.writeFileSync(
    TAX_MAPPING_PATH,
    JSON.stringify({ categories, tags: tagMap }, null, 2),
  );
  console.log(
    `  ${Object.keys(categories).length} categories, ${Object.keys(tagMap).length} tags -> ${TAX_MAPPING_PATH}`,
  );
  console.log("\n=== KLAAR ===");
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
