"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getHomepageConfig, upsertHomepageConfig } from "@ptrdbrbndr/cms";
import type { HomepageConfig } from "@ptrdbrbndr/cms";
import { Save, RefreshCw } from "lucide-react";

export default function HomepageAdminPage() {
  const [config, setConfig] = useState<Partial<HomepageConfig>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const supabase = createClient();
        const data = await getHomepageConfig(supabase);
        if (data) setConfig(data);
      } catch (err) {
        console.error("Failed to fetch homepage config:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  const update = (key: keyof HomepageConfig, value: string | number | null) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const updated = await upsertHomepageConfig(supabase, config);
      setConfig(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save homepage config:", err);
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

  const fieldClass = "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700";
  const sectionClass = "rounded-xl border border-gray-200 bg-white p-6";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage</h1>
          <p className="mt-1 text-sm text-gray-500">Beheer de inhoud van de homepage zonder code-deployments.</p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
            <RefreshCw className="h-3.5 w-3.5" />
            Opgeslagen
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        {/* Hero */}
        <div className={sectionClass}>
          <h2 className="mb-5 text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Hero sectie</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Hero titel</label>
              <input
                type="text"
                value={config.hero_title ?? ""}
                onChange={(e) => update("hero_title", e.target.value)}
                data-testid="hero-title"
                className={fieldClass}
                placeholder="Samen voor kansarme vrouwen in India"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Hero ondertitel</label>
              <textarea
                value={config.hero_subtitle ?? ""}
                onChange={(e) => update("hero_subtitle", e.target.value)}
                rows={2}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>CTA knoptekst</label>
              <input
                type="text"
                value={config.hero_cta_text ?? ""}
                onChange={(e) => update("hero_cta_text", e.target.value)}
                className={fieldClass}
                placeholder="Steun ons"
              />
            </div>
            <div>
              <label className={labelClass}>CTA link</label>
              <input
                type="text"
                value={config.hero_cta_href ?? ""}
                onChange={(e) => update("hero_cta_href", e.target.value)}
                className={fieldClass}
                placeholder="/steun-ons"
              />
            </div>
          </div>
        </div>

        {/* Missie */}
        <div className={sectionClass}>
          <h2 className="mb-5 text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Missie sectie</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Badge tekst</label>
              <input type="text" value={config.mission_badge ?? ""} onChange={(e) => update("mission_badge", e.target.value)} className={fieldClass} placeholder="Onze Missie" />
            </div>
            <div>
              <label className={labelClass}>Titel</label>
              <input type="text" value={config.mission_title ?? ""} onChange={(e) => update("mission_title", e.target.value)} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Tekst</label>
              <textarea value={config.mission_text ?? ""} onChange={(e) => update("mission_text", e.target.value)} rows={4} className={fieldClass} />
            </div>
          </div>
        </div>

        {/* Projecten */}
        <div className={sectionClass}>
          <h2 className="mb-5 text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Projecten sectie</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Badge tekst</label>
              <input type="text" value={config.projects_badge ?? ""} onChange={(e) => update("projects_badge", e.target.value)} className={fieldClass} placeholder="Onze Projecten" />
            </div>
            <div>
              <label className={labelClass}>Titel</label>
              <input type="text" value={config.projects_title ?? ""} onChange={(e) => update("projects_title", e.target.value)} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Ondertitel</label>
              <input type="text" value={config.projects_subtitle ?? ""} onChange={(e) => update("projects_subtitle", e.target.value)} className={fieldClass} />
            </div>
          </div>
        </div>

        {/* Nieuws */}
        <div className={sectionClass}>
          <h2 className="mb-5 text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Nieuws sectie</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Badge tekst</label>
              <input type="text" value={config.news_badge ?? ""} onChange={(e) => update("news_badge", e.target.value)} className={fieldClass} placeholder="Laatste Nieuws" />
            </div>
            <div>
              <label className={labelClass}>Titel</label>
              <input type="text" value={config.news_title ?? ""} onChange={(e) => update("news_title", e.target.value)} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Aantal berichten</label>
              <input
                type="number"
                min={1}
                max={9}
                value={config.news_limit ?? 3}
                onChange={(e) => update("news_limit", parseInt(e.target.value) || 3)}
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        {/* Donatie CTA */}
        <div className={sectionClass}>
          <h2 className="mb-5 text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Donatie CTA</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Titel</label>
              <input type="text" value={config.donate_title ?? ""} onChange={(e) => update("donate_title", e.target.value)} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Tekst</label>
              <textarea value={config.donate_text ?? ""} onChange={(e) => update("donate_text", e.target.value)} rows={3} className={fieldClass} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>IBAN</label>
                <input type="text" value={config.donate_iban ?? ""} onChange={(e) => update("donate_iban", e.target.value)} className={`${fieldClass} font-mono`} />
              </div>
              <div>
                <label className={labelClass}>Ten name van</label>
                <input type="text" value={config.donate_iban_name ?? ""} onChange={(e) => update("donate_iban_name", e.target.value)} className={fieldClass} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            data-testid="save-homepage-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
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
