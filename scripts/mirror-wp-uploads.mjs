/**
 * Spiegelt public_html/wp-content/uploads van de mijn.host-server naar een
 * lokale map via SFTP. Nodig omdat de mijn.host-WAF bulk-downloads over
 * HTTPS als aanval aanmerkt en dan het hele IP blokkeert (incident 19-21 aug
 * 2026); SFTP gaat buiten de WAF om. Draai dit vóór premigrate-wp-media.mjs
 * en fix-missing-uploads.mjs en geef die scripts dezelfde UPLOADS_DIR mee,
 * dan lezen ze de bestanden lokaal in plaats van ze van de site te trekken.
 *
 * Al aanwezige bestanden met gelijke grootte worden overgeslagen; het script
 * is dus idempotent en her-runbaar na een afgebroken poging.
 *
 * Vereist curl met sftp-support (Git Bash-curl heeft dat; check `curl -V`).
 * Credentials: zie credentials.md sectie "stichtingkettingreactie" (FTP).
 *
 * Run:
 *   SKR_FTP_USER=... SKR_FTP_PASS=... \
 *   UPLOADS_DIR=c:/tmp/skr-uploads node scripts/mirror-wp-uploads.mjs
 */

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const HOST = "h57.mijn.host";
const REMOTE_BASE = "public_html/wp-content/uploads";
const FTP_USER = process.env.SKR_FTP_USER;
const FTP_PASS = process.env.SKR_FTP_PASS;
const DEST = process.env.UPLOADS_DIR ?? "c:/tmp/skr-uploads";
if (!FTP_USER || !FTP_PASS) {
  console.error("SKR_FTP_USER en SKR_FTP_PASS env vars vereist (zie credentials.md)");
  process.exit(1);
}
const USERPASS = `${FTP_USER}:${FTP_PASS}`;

// pad-segmenten percent-encoden, slashes laten staan
function encPath(rel) {
  return rel.split("/").map(encodeURIComponent).join("/");
}

function listDir(rel) {
  const url = `sftp://${HOST}/${REMOTE_BASE}/${rel ? encPath(rel) : ""}`;
  const out = execFileSync("curl", ["-s", "--insecure", "--user", USERPASS, url], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  const entries = [];
  for (const line of out.split("\n")) {
    // ls-stijl: perms links owner group size maand dag jaar-of-tijd naam...
    const m = line.match(/^([-dl])\S+\s+\S+\s+\S+\s+\S+\s+(\d+)\s+\S+\s+\S+\s+\S+\s+(.*\S)\s*$/);
    if (!m) continue;
    const [, type, size, name] = m;
    if (name === "." || name === "..") continue;
    entries.push({ type, size: Number(size), name });
  }
  return entries;
}

function walk(rel = "") {
  const files = [];
  for (const e of listDir(rel)) {
    if (e.type === "d") files.push(...walk(`${rel}${e.name}/`));
    else if (e.type === "-") files.push({ rel: `${rel}${e.name}`, size: e.size });
  }
  return files;
}

function main() {
  console.log(`=== listing ${HOST}/${REMOTE_BASE} ===`);
  const remote = walk();
  const total = remote.reduce((s, f) => s + f.size, 0);
  console.log(`  ${remote.length} bestanden, ${(total / 1024 / 1024).toFixed(0)} MB`);

  const todo = remote.filter((f) => {
    const local = path.join(DEST, f.rel);
    return !(fs.existsSync(local) && fs.statSync(local).size === f.size);
  });
  console.log(`  ${todo.length} te downloaden (rest al aanwezig met gelijke grootte)`);
  if (todo.length === 0) {
    console.log("=== KLAAR (niets te doen) ===");
    return;
  }

  // ASCII-namen gaan in bulk via een curl-configbestand (één parallel-run,
  // config via stdin zodat de credentials niet op schijf belanden); namen met
  // multibyte-tekens (bv. typografische apostrofs) raakt curl's config-parser
  // op Windows kwijt, dus die gaan stuk voor stuk via directe argumenten.
  const ascii = todo.filter((f) => /^[\x20-\x7e]+$/.test(f.rel));
  const unicode = todo.filter((f) => !/^[\x20-\x7e]+$/.test(f.rel));
  console.log(`=== downloaden naar ${DEST} (${ascii.length} bulk + ${unicode.length} los) ===`);

  if (ascii.length) {
    const lines = ["--parallel", "--parallel-max 6", "-s", "--insecure", "--create-dirs", `--user "${USERPASS}"`];
    for (const f of ascii) {
      const q = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
      lines.push(`url = ${q(`sftp://${HOST}/${REMOTE_BASE}/${encPath(f.rel)}`)}`);
      lines.push(`output = ${q(path.join(DEST, f.rel).replaceAll("\\", "/"))}`);
    }
    const r = spawnSync("curl", ["-K", "-"], {
      input: lines.join("\n"),
      stdio: ["pipe", "inherit", "inherit"],
      maxBuffer: 1024,
    });
    if (r.status !== 0) {
      console.error(`curl exit ${r.status} — draai het script opnieuw, het pakt op waar het bleef`);
      process.exit(1);
    }
  }

  for (const f of unicode) {
    execFileSync("curl", [
      "-s", "--insecure", "--create-dirs", "--user", USERPASS,
      "-o", path.join(DEST, f.rel),
      `sftp://${HOST}/${REMOTE_BASE}/${encPath(f.rel)}`,
    ]);
  }

  // verificatie: alles aanwezig met juiste grootte?
  const missing = remote.filter((f) => {
    const local = path.join(DEST, f.rel);
    return !(fs.existsSync(local) && fs.statSync(local).size === f.size);
  });
  if (missing.length) {
    console.error(`  ! ${missing.length} bestanden ontbreken/onvolledig na run:`);
    for (const f of missing.slice(0, 10)) console.error(`    ${f.rel}`);
    process.exit(1);
  }
  console.log(`=== KLAAR: ${remote.length} bestanden lokaal in sync ===`);
}

main();
