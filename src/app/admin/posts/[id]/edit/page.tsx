"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  getArticleById,
  getCategories,
  updateArticle,
  slugify,
} from "@ptrdbrbndr/cms";
import type { Article, ArticleStatus, Category } from "@ptrdbrbndr/cms";
import { TiptapEditor } from "@ptrdbrbndr/cms/components/editor";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<ArticleStatus>("draft");
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [contentHtml, setContentHtml] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        const [art, cats] = await Promise.all([
          getArticleById(supabase, id),
          getCategories(supabase),
        ]);

        if (!art) {
          setError("Bericht niet gevonden.");
          setLoading(false);
          return;
        }

        setArticle(art);
        setTitle(art.title);
        setSlug(art.slug);
        setExcerpt(art.excerpt ?? "");
        setCategoryId(art.category_id ?? "");
        setStatus(art.status);
        setContent(art.content ?? {});
        setContentHtml(art.content_html ?? "");
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError("Laden mislukt. Probeer het opnieuw.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value));
  };

  const handleEditorChange = (
    json: Record<string, unknown>,
    html: string
  ) => {
    setContent(json);
    setContentHtml(html);
  };

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

      const wasPublished = article?.status === "published";
      const isNowPublished = status === "published";

      await updateArticle(supabase, id, {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content,
        content_html: contentHtml || null,
        category_id: categoryId || null,
        status,
        published_at:
          !wasPublished && isNowPublished
            ? new Date().toISOString()
            : undefined,
      });

      router.push("/admin/posts");
    } catch (err) {
      console.error("Failed to update article:", err);
      setError("Opslaan mislukt. Probeer het opnieuw.");
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

  if (!article && error) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">{error}</p>
        <Link
          href="/admin/posts"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar berichten
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/posts"
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Bericht bewerken</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Titel
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            placeholder="Titel van het bericht"
          />
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            placeholder="url-vriendelijke-slug"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="excerpt"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Samenvatting
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            placeholder="Korte samenvatting van het bericht"
          />
        </div>

        {/* Category and Status */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Categorie
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            >
              <option value="">Geen categorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ArticleStatus)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            >
              <option value="draft">Concept</option>
              <option value="published">Gepubliceerd</option>
            </select>
          </div>
        </div>

        {/* Content editor */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Inhoud
          </label>
          {article?.content && Object.keys(article.content).length > 0 ? (
            <TiptapEditor
              content={article.content}
              onChange={handleEditorChange}
              placeholder="Begin met schrijven..."
            />
          ) : (
            <TiptapEditor
              onChange={handleEditorChange}
              placeholder="Begin met schrijven..."
            />
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
          <Link
            href="/admin/posts"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Annuleren
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Opslaan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Opslaan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
