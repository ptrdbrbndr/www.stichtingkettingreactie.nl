/**
 * Naloop op premigrate-wp-media.mjs: vindt wp-content/uploads-URL's die nog in
 * de gemigreerde content (articles/pages) staan, downloadt die bestanden
 * rechtstreeks van de live WP-site, uploadt ze naar de `wp-uploads`-bucket en
 * registreert ze in de `media`-tabel. Draai daarna migrate-wp.mjs opnieuw
 * zodat de URL-rewrite ze oppakt.
 *
 * Nodig omdat deze WP-site bestanden plat in /uploads bewaart en content naar
 * size-varianten en PDF's verwijst die niet in de media-API geregistreerd staan.
 *
 * Zet UPLOADS_DIR naar een lokale spiegel van wp-content/uploads (gemaakt met
 * mirror-wp-uploads.mjs) om lokaal te lezen in plaats van per bestand te
 * downloaden — bulk-downloads over HTTPS triggeren de mijn.host-WAF (IP-ban).
 *
 * Run: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... UPLOADS_DIR=c:/tmp/skr-uploads \
 *      node scripts/fix-missing-uploads.mjs
 */

import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const UPLOADS_DIR = process.env.UPLOADS_DIR;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("SUPABASE_URL en SUPABASE_SERVICE_KEY env vars vereist");
  process.exit(1);
}
const BUCKET = "wp-uploads";
const URL_RE =
  /https?:\/\/(?:www\.)?stichtingkettingreactie\.nl\/wp-content\/uploads\/([^"'\s)>\\]+)/g;

const sbHeaders = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
};

async function sbGetAll(table, select) {
  const out = [];
  let from = 0;
  while (true) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${select}`, {
      headers: { ...sbHeaders, Range: `${from}-${from + 999}` },
    });
    if (!r.ok) throw new Error(`${table}: ${r.status} ${await r.text()}`);
    const batch = await r.json();
    out.push(...batch);
    if (batch.length < 1000) break;
    from += 1000;
  }
  return out;
}

function extOf(rel) {
  return (rel.split(".").pop() ?? "").toLowerCase();
}

// Storage weigert keys met o.a. typografische apostrofs; media.filename houdt
// het originele pad (lookup-key voor de rewrite), de object-key wordt schoon.
function sanitizeKey(rel) {
  return rel.replace(/[^\w./-]+/g, "-");
}
const MIME = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif",
  webp: "image/webp", svg: "image/svg+xml", pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

async function main() {
  const rows = [
    ...(await sbGetAll("articles", "slug,content_html,featured_image")),
    ...(await sbGetAll("pages", "slug,content_html,featured_image")),
  ];
  const known = new Set(
    (await sbGetAll("media", "filename")).map((m) => m.filename),
  );

  const wanted = new Set();
  for (const row of rows) {
    for (const src of [row.content_html ?? "", row.featured_image ?? ""]) {
      for (const m of src.matchAll(URL_RE)) {
        const rel = decodeURIComponent(m[1].split("?")[0].split("#")[0]);
        if (!known.has(rel)) wanted.add(rel);
      }
    }
  }
  console.log(`${wanted.size} ontbrekende upload-bestanden gevonden`);

  let ok = 0, fail = 0;
  for (const rel of wanted) {
    try {
      let buf;
      const local = UPLOADS_DIR ? path.join(UPLOADS_DIR, rel) : null;
      if (local && fs.existsSync(local)) {
        buf = fs.readFileSync(local);
      } else {
        if (local) console.warn(`  ~ ${rel}: niet in UPLOADS_DIR, val terug op HTTP`);
        const dl = await fetch(
          `https://stichtingkettingreactie.nl/wp-content/uploads/${encodeURI(rel)}`,
        );
        if (!dl.ok) throw new Error(`WP download: ${dl.status}`);
        buf = Buffer.from(await dl.arrayBuffer());
      }
      const mime = MIME[extOf(rel)] ?? "application/octet-stream";
      const key = sanitizeKey(rel);
      const up = await fetch(
        `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURI(key)}`,
        {
          method: "POST",
          headers: { ...sbHeaders, "Content-Type": mime, "x-upsert": "true" },
          body: buf,
        },
      );
      if (!up.ok) throw new Error(`upload: ${up.status} ${await up.text()}`);
      const ins = await fetch(
        `${SUPABASE_URL}/rest/v1/media?on_conflict=storage_path`,
        {
          method: "POST",
          headers: {
            ...sbHeaders,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates",
          },
          body: JSON.stringify({
            filename: rel,
            storage_path: `${BUCKET}/${key}`,
            url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURI(key)}`,
            mime_type: mime,
            size_bytes: buf.length,
          }),
        },
      );
      if (!ins.ok) throw new Error(`media row: ${ins.status} ${await ins.text()}`);
      ok++;
    } catch (e) {
      fail++;
      console.error(`  ! ${rel}: ${e.message?.slice(0, 140)}`);
    }
  }
  console.log(`klaar: ok=${ok} fail=${fail} — draai nu migrate-wp.mjs opnieuw`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
