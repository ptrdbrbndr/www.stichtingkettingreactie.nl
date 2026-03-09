"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/test-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const from = searchParams.get("from") || "/";
      router.push(from);
    } else {
      const data = await res.json();
      setError(data.error || "Ongeldige inloggegevens");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Gebruikersnaam
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          required
          data-testid="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Wachtwoord
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          data-testid="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      {error && (
        <p data-testid="error-message" className="text-red-600 text-sm">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        data-testid="login-button"
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
      >
        {loading ? "Bezig..." : "Inloggen"}
      </button>
    </form>
  );
}

export default function TestLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-skr.png"
            alt="Stichting Kettingreactie"
            width={160}
            height={60}
            className="object-contain"
          />
        </div>
        <p className="text-center text-sm text-gray-500 mb-6">
          Testomgeving — inloggen vereist
        </p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
