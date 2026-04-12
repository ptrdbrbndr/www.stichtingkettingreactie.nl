const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201C",
  rdquo: "\u201D",
  laquo: "«",
  raquo: "»",
  copy: "©",
  reg: "®",
  trade: "™",
  euro: "€",
};

/**
 * Decodes common HTML entities in a plain string. Needed because WordPress-
 * migrated content in Supabase (titles, excerpts) contains entities like
 * &#8211; that never get rendered when we use {value} in JSX.
 */
export function decodeEntities(
  value: string | null | undefined,
): string {
  if (!value) return "";
  let result = value.replace(/&#(\d+);/g, (match, code: string) => {
    const cp = parseInt(code, 10);
    if (Number.isNaN(cp)) return match;
    try {
      return String.fromCodePoint(cp);
    } catch {
      return match;
    }
  });
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (match, code: string) => {
    const cp = parseInt(code, 16);
    if (Number.isNaN(cp)) return match;
    try {
      return String.fromCodePoint(cp);
    } catch {
      return match;
    }
  });
  result = result.replace(/&([a-zA-Z]+);/g, (match, name: string) => {
    return NAMED_ENTITIES[name] ?? match;
  });
  return result;
}
