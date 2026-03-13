"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { getMediaFiles, uploadMedia, deleteMedia } from "@ptrdbrbndr/cms";
import type { Media } from "@ptrdbrbndr/cms";
import { Upload, Trash2, Copy, Check, Search, ImageIcon } from "lucide-react";

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    try {
      const supabase = createClient();
      const result = await getMediaFiles(supabase, { limit: 100, search: search || undefined });
      setMedia(result.media);
      setTotal(result.total);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [search]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const supabase = createClient();
      await Promise.all(
        Array.from(files).map((file) => uploadMedia(supabase, file))
      );
      await fetchMedia();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Uploaden mislukt. Controleer of het bestand een geldige afbeelding is.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: Media) => {
    if (!confirm(`Weet je zeker dat je "${item.filename}" wilt verwijderen?`)) return;
    setDeleting(item.id);
    try {
      const supabase = createClient();
      await deleteMedia(supabase, item.id);
      setMedia((prev) => prev.filter((m) => m.id !== item.id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Verwijderen mislukt.");
    } finally {
      setDeleting(null);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatBytes = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media</h1>
          <p className="mt-1 text-sm text-gray-500">{total} bestand{total !== 1 ? "en" : ""}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Zoeken..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="media-search"
              className="w-48 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            data-testid="upload-media-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700 disabled:opacity-50"
          >
            {uploading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Uploaden
          </button>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files);
        }}
        className="mb-6 rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-sm text-gray-400 hover:border-pink-300 hover:text-pink-500 transition-colors"
      >
        Sleep afbeeldingen hierheen om te uploaden
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        </div>
      ) : media.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-16 text-center">
          <ImageIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="text-gray-500">Nog geen bestanden.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <div
              key={item.id}
              data-testid="media-item"
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {item.mime_type?.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.alt_text ?? item.filename}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handleCopy(item.url, item.id)}
                    className="rounded-lg bg-white p-2 text-gray-700 hover:bg-gray-100"
                    title="URL kopiëren"
                  >
                    {copied === item.id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deleting === item.id}
                    className="rounded-lg bg-white p-2 text-red-600 hover:bg-red-50"
                    title="Verwijderen"
                  >
                    {deleting === item.id ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent block" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3">
                <p className="truncate text-xs font-medium text-gray-800" title={item.filename}>
                  {item.filename}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{formatBytes(item.size_bytes)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
