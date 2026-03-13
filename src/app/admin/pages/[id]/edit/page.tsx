"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getPageById, updatePage, slugify } from "@ptrdbrbndr/cms";
import type { Page } from "@ptrdbrbndr/cms";
import { TiptapEditor } from "@ptrdbrbndr/cms/components/editor";
import { ArrowLeft, Save, ExternalLink } from "lucide-react";

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [contentHtml, setContentHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        const supabase = createClient();
        const data = await getPageById(supabase, id);
        setPage(data);
        setTitle(data.title);
        setSlug(data.slug);
        setSubtitle(data.subtitle ?? "");
        setStatus(data.status);
        setMetaTitle(data.meta_title ?? "");
        setMetaDescription(data.meta_description ?? "");
        setContent(data.content ?? {});
        setContentHtml(data.content_html ?? "");
      } catch (err) {
        console.error("Failed to fetch page:", err);
        setError("Pagina niet gevonden.");
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      setError("Titel en slug zijn verplicht.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      await updatePage(supabase, id, {
        title: title.trim(),
        slug: slug.trim(),
        subtitle: subtitle.trim() || null,
        status,
        content,
        content_html: contentHtml || null,
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
      });
      router.push("/admin/pages");
    } catch (err) {
      console.error("Failed to update page:", err);
      setError("Opslaan mislukt.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
      </div>
    );
  }

  if (!page && error) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">{error}</p>
        <Link href="/admin/pages" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-pink-600">
          <ArrowLeft className="h-4 w-4" />
          Terug naar pagina&apos;s
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/pages"
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Pagina bewerken</h1>
          {page && (
            <a
              href={`/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
              title="Bekijk pagina"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Titel *</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>

            <div>
              <label htmlFor="subtitle" className="mb-1 block text-sm font-medium text-gray-700">Ondertitel</label>
              <input
                id="subtitle"
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Inhoud</label>
              {page?.content && Object.keys(page.content).length > 0 ? (
                <TiptapEditor
                  content={page.content}
                  onChange={(json, html) => { setContent(json); setContentHtml(html); }}
                  placeholder="Begin met schrijven..."
                />
              ) : (
                <TiptapEditor
                  onChange={(json, html) => { setContent(json); setContentHtml(html); }}
                  placeholder="Begin met schrijven..."
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">Publicatie</h3>

              <div className="mb-4">
                <label htmlFor="slug" className="mb-1 block text-sm font-medium text-gray-700">Slug *</label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:border-pink-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-400">URL: /{slug}</p>
              </div>

              <div>
                <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
                >
                  <option value="draft">Concept</option>
                  <option value="published">Gepubliceerd</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">SEO</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="meta-title" className="mb-1 block text-sm font-medium text-gray-700">Meta titel</label>
                  <input
                    id="meta-title"
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="meta-desc" className="mb-1 block text-sm font-medium text-gray-700">Meta beschrijving</label>
                  <textarea
                    id="meta-desc"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
          <Link
            href="/admin/pages"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Annuleren
          </Link>
          <button
            type="submit"
            disabled={saving}
            data-testid="save-page-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
          >
            {saving ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Opslaan
          </button>
        </div>
      </form>
    </div>
  );
}
