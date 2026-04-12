/**
 * Migrate WP posts + pages -> Supabase articles + pages.
 *
 * - Fetches WP REST API (with _embed for media + terms)
 * - Replaces all https://stichtingkettingreactie.nl/wp-content/uploads/{file} URLs
 *   with Supabase Storage public URLs (looked up via media table)
 * - Generates TipTap JSON via @tiptap/html generateJSON with the same extensions
 *   as the editor (starter-kit + image + link)
 * - Idempotent upsert via slug
 *
 * Run: node c:/tmp/skr-migrate-content.mjs
 */

import { generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { JSDOM } from "jsdom";
import fs from "node:fs";

// Inject DOM globals for tiptap-html (needs Document/HTMLElement)
const dom = new JSDOM("");
globalThis.document = dom.window.document;
globalThis.window = dom.window;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Node = dom.window.Node;
globalThis.DOMParser = dom.window.DOMParser;

const SUPABASE_URL = "https://flwdwnefhfjagibvjpqh.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
if (!SERVICE_KEY) {
  console.error("SUPABASE_SERVICE_KEY env var required");
  process.exit(1);
}
const WP_BASE = "https://stichtingkettingreactie.nl/wp-json/wp/v2";
const STORAGE_PUBLIC = `${SUPABASE_URL}/storage/v1/object/public/wp-uploads`;
const WP_UPLOADS_PREFIX = "https://stichtingkettingreactie.nl/wp-content/uploads";

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

const tiptapExtensions = [
  StarterKit.configure({
    codeBlock: false,
    horizontalRule: { HTMLAttributes: {} },
  }),
  Image.configure({ allowBase64: true, inline: false }),
  Link.configure({ openOnClick: false, autolink: false }),
];

// --- Fetch helpers ---

async function sbGet(path) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers });
  if (!r.ok) throw new Error(`GET ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

async function sbUpsert(table, payload, conflictCol = "slug") {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?on_conflict=${conflictCol}`,
    {
      method: "POST",
      headers: {
        ...headers,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(payload),
    },
  );
  if (!r.ok) {
    throw new Error(`upsert ${table}: ${r.status} ${await r.text()}`);
  }
  return r.json();
}

async function sbInsert(table, payload) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`insert ${table}: ${r.status} ${await r.text()}`);
  return r.json();
}

async function sbDelete(table, query) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    method: "DELETE",
    headers,
  });
  if (!r.ok && r.status !== 404)
    throw new Error(`delete ${table}: ${r.status} ${await r.text()}`);
}

// --- Load mappings ---

let mediaMap; // basename -> public_url
let categoryMap; // wp_id -> uuid
let tagMap; // wp_id -> uuid

async function loadMediaMap() {
  console.log("Loading media table...");
  const all = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/media?select=filename,storage_path,url&order=filename`,
      { headers: { ...headers, Range: `${from}-${from + pageSize - 1}` } },
    );
    const batch = await r.json();
    all.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  console.log(`  ${all.length} media rows`);
  const map = new Map();
  for (const m of all) map.set(m.filename, m.url);
  return map;
}

async function loadTaxMappings() {
  const data = JSON.parse(
    fs.readFileSync("c:/tmp/skr-tax-mapping.json", "utf-8"),
  );
  return {
    categoryMap: new Map(Object.entries(data.categories).map(([k, v]) => [parseInt(k), v])),
    tagMap: new Map(Object.entries(data.tags).map(([k, v]) => [parseInt(k), v])),
  };
}

// --- WP REST fetch ---

async function fetchAllWP(endpoint) {
  const all = [];
  let page = 1;
  while (true) {
    const r = await fetch(
      `${WP_BASE}/${endpoint}?per_page=20&page=${page}&_embed=1&status=publish`,
    );
    if (r.status === 400) break;
    if (!r.ok) throw new Error(`WP fetch ${endpoint} p${page}: ${r.status}`);
    const items = await r.json();
    if (items.length === 0) break;
    all.push(...items);
    if (items.length < 20) break;
    page++;
  }
  return all;
}

// --- URL replacement ---

function rewriteUrls(html) {
  if (!html) return html;
  // Match any wp-uploads URL with optional query/fragment
  return html.replace(
    /https?:\/\/(?:www\.)?stichtingkettingreactie\.nl\/wp-content\/uploads\/([^"'\s)>]+)/g,
    (match, filename) => {
      const cleanFn = decodeURIComponent(filename.split("?")[0].split("#")[0]);
      const newUrl = mediaMap.get(cleanFn);
      if (newUrl) return newUrl;
      // try basename only (in case of subfolder paths)
      const base = cleanFn.split("/").pop();
      const fallback = mediaMap.get(base);
      if (fallback) return fallback;
      // not in map -> leave as-is, will 404 later but logged
      return match;
    },
  );
}

// --- Article migration ---

function pickCategoryId(wpPost) {
  const cats = wpPost._embedded?.["wp:term"]?.[0] ?? [];
  // prefer non-uncategorized, deepest in hierarchy
  const filtered = cats.filter((c) => c.slug !== "uncategorized");
  if (filtered.length === 0) return null;
  // pick first child (most specific) - they come ordered by id
  const first = filtered[0];
  return categoryMap.get(first.id) ?? null;
}

function getTagWpIds(wpPost) {
  const tags = wpPost._embedded?.["wp:term"]?.[1] ?? [];
  return tags.map((t) => t.id).filter((id) => tagMap.has(id));
}

function getFeaturedImage(wpPost) {
  const media = wpPost._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  const src = media.source_url;
  if (!src) return null;
  return rewriteUrls(src);
}

function htmlToTipTapJson(html) {
  if (!html || html.trim() === "") {
    return { type: "doc", content: [{ type: "paragraph" }] };
  }
  try {
    return generateJSON(html, tiptapExtensions);
  } catch (e) {
    console.error(`  ! TipTap parse failed: ${e.message?.slice(0, 100)}`);
    return {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "[content imported from WordPress]" }] }],
    };
  }
}

function decode(s) {
  if (!s) return s;
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&nbsp;/g, " ");
}

async function migrateArticle(post) {
  const slug = post.slug;
  const titleHtml = post.title?.rendered ?? "(geen titel)";
  const title = decode(titleHtml);
  const contentHtml = rewriteUrls(post.content?.rendered ?? "");
  const excerptHtml = post.excerpt?.rendered ?? "";
  const excerpt = decode(excerptHtml.replace(/<[^>]+>/g, "").trim()).slice(0, 500);
  const featuredImage = getFeaturedImage(post);
  const categoryId = pickCategoryId(post);
  const tagWpIds = getTagWpIds(post);
  const contentJson = htmlToTipTapJson(contentHtml);

  const payload = {
    title,
    slug,
    excerpt: excerpt || null,
    content: contentJson,
    content_html: contentHtml,
    featured_image: featuredImage,
    category_id: categoryId,
    status: "published",
    published_at: post.date_gmt ? `${post.date_gmt}Z` : null,
    meta_title: title,
    meta_description: excerpt || null,
  };

  const result = await sbUpsert("articles", payload, "slug");
  const articleId = result[0]?.id;
  if (!articleId) throw new Error("no article id returned");

  // Replace tag links
  await sbDelete("article_tags", `article_id=eq.${articleId}`);
  if (tagWpIds.length > 0) {
    const links = tagWpIds.map((wpId) => ({
      article_id: articleId,
      tag_id: tagMap.get(wpId),
    }));
    await sbInsert("article_tags", links);
  }
  return articleId;
}

async function migratePage(page) {
  const slug = page.slug;
  const title = decode(page.title?.rendered ?? "(geen titel)");
  const contentHtml = rewriteUrls(page.content?.rendered ?? "");
  const featuredImage = getFeaturedImage(page);
  const contentJson = htmlToTipTapJson(contentHtml);

  const payload = {
    title,
    slug,
    content: contentJson,
    content_html: contentHtml,
    featured_image: featuredImage,
    status: "published",
    meta_title: title,
  };
  await sbUpsert("pages", payload, "slug");
}

// --- Main ---

async function main() {
  console.log("=== Loading mappings ===");
  mediaMap = await loadMediaMap();
  ({ categoryMap, tagMap } = await loadTaxMappings());
  console.log(`  ${categoryMap.size} categories, ${tagMap.size} tags, ${mediaMap.size} media`);

  console.log("\n=== Fetching WP posts ===");
  const posts = await fetchAllWP("posts");
  console.log(`  ${posts.length} posts`);

  console.log("\n=== Fetching WP pages ===");
  const pages = await fetchAllWP("pages");
  console.log(`  ${pages.length} pages`);

  console.log("\n=== Migrating articles ===");
  let okPosts = 0,
    failPosts = 0;
  for (const post of posts) {
    try {
      await migrateArticle(post);
      okPosts++;
      if (okPosts % 10 === 0) console.log(`  [${okPosts}/${posts.length}] articles`);
    } catch (e) {
      failPosts++;
      console.error(`  ! ${post.slug}: ${e.message?.slice(0, 200)}`);
    }
  }
  console.log(`  done: ok=${okPosts} fail=${failPosts}`);

  console.log("\n=== Migrating pages ===");
  let okPages = 0,
    failPages = 0;
  for (const page of pages) {
    try {
      await migratePage(page);
      okPages++;
      console.log(`  + ${page.slug}`);
    } catch (e) {
      failPages++;
      console.error(`  ! ${page.slug}: ${e.message?.slice(0, 200)}`);
    }
  }
  console.log(`  done: ok=${okPages} fail=${failPages}`);

  console.log("\n=== ALL DONE ===");
  console.log(`articles: ${okPosts}/${posts.length}`);
  console.log(`pages:    ${okPages}/${pages.length}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
