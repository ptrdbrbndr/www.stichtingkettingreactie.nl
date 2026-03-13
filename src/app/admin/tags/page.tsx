"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getTags, createTag, deleteTag, slugify } from "@ptrdbrbndr/cms";
import type { Tag } from "@ptrdbrbndr/cms";
import { Plus, Trash2 } from "lucide-react";

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchTags = async () => {
    try {
      const supabase = createClient();
      const data = await getTags(supabase);
      setTags(data);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const supabase = createClient();
      await createTag(supabase, {
        name: newName.trim(),
        slug: newSlug.trim() || slugify(newName),
      });
      setNewName("");
      setNewSlug("");
      await fetchTags();
    } catch (err) {
      console.error("Failed to create tag:", err);
      alert("Aanmaken mislukt.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (tag: Tag) => {
    if (!confirm(`Weet je zeker dat je tag "${tag.name}" wilt verwijderen?`)) return;
    setDeleting(tag.id);
    try {
      const supabase = createClient();
      await deleteTag(supabase, tag.id);
      setTags((prev) => prev.filter((t) => t.id !== tag.id));
    } catch (err) {
      console.error("Failed to delete tag:", err);
      alert("Verwijderen mislukt.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Tags</h1>

      {/* New tag form */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Nieuwe tag</h2>
        <form onSubmit={handleCreate} className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Naam *"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
              setNewSlug(slugify(e.target.value));
            }}
            required
            data-testid="new-tag-name"
            className="flex-1 min-w-[160px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
          <input
            type="text"
            placeholder="Slug (optioneel)"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            className="flex-1 min-w-[160px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
          <button
            type="submit"
            disabled={saving}
            data-testid="save-tag-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Toevoegen
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        </div>
      ) : tags.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-16 text-center">
          <p className="text-gray-500">Nog geen tags.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <div
              key={tag.id}
              data-testid="tag-item"
              className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
            >
              <span>{tag.name}</span>
              <span className="text-xs text-gray-400">/{tag.slug}</span>
              <button
                onClick={() => handleDelete(tag)}
                disabled={deleting === tag.id}
                className="ml-1 rounded-full p-0.5 text-gray-300 hover:text-red-500 transition-colors disabled:opacity-50"
                title="Verwijderen"
              >
                {deleting === tag.id ? (
                  <span className="block h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
