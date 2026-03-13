"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];

export default function DonateForm() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePreset = (value: number) => {
    setAmount(value.toString());
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 1) {
      setError("Voer een geldig bedrag in (minimaal €1).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Er is iets misgegaan.");
        return;
      }

      // Redirect to Mollie checkout
      window.location.href = data.checkoutUrl;
    } catch {
      setError("Kon geen verbinding maken. Probeer het later opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
          <CreditCard className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            Online doneren
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Doneer veilig via iDEAL, creditcard of andere betaalmethoden.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Preset amounts */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Kies een bedrag
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePreset(preset)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  amount === preset.toString()
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                &euro;{preset}
              </button>
            ))}
          </div>
        </div>

        {/* Custom amount */}
        <div>
          <label
            htmlFor="donate-amount"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Of voer een eigen bedrag in
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              &euro;
            </span>
            <input
              id="donate-amount"
              type="number"
              min="1"
              max="25000"
              step="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError(null);
              }}
              required
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-8 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="0,00"
            />
          </div>
        </div>

        {/* Optional name */}
        <div>
          <label
            htmlFor="donate-name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Naam{" "}
            <span className="font-normal text-gray-400">(optioneel)</span>
          </label>
          <input
            id="donate-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            placeholder="Uw naam"
          />
        </div>

        {/* Optional email */}
        <div>
          <label
            htmlFor="donate-email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            E-mail{" "}
            <span className="font-normal text-gray-400">
              (optioneel, voor bevestiging)
            </span>
          </label>
          <input
            id="donate-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            placeholder="uw@email.nl"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Betaling voorbereiden...
            </span>
          ) : (
            `Doneer ${amount ? `€${amount}` : ""}`
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          Veilig betalen via Mollie. Uw gegevens worden niet opgeslagen.
        </p>
      </form>
    </div>
  );
}
