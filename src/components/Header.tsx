"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Over Ons", href: "/over-ons" },
  { label: "Projecten", href: "/projecten" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Steun Ons", href: "/steun-ons" },
  { label: "Verantwoording", href: "/verantwoording" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-sm border-b border-gray-100" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo-skr.png"
              alt="Stichting Kettingreactie logo"
              className="h-10 w-auto shrink-0"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Stichting
              </span>
              <span className="text-base font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                Kettingreactie
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Leden button + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/leden"
              className="hidden items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 md:inline-flex"
              title="Leden-portal"
            >
              <User className="h-3.5 w-3.5" />
              Leden
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-primary-700 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 md:hidden">
          <nav className="mx-auto max-w-7xl space-y-0.5 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/leden"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary-700 transition-colors"
            >
              <User className="h-4 w-4" />
              Leden-portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
