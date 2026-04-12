"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, User } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// Hiërarchie 1:1 overgenomen uit de oude WordPress menu-structuur
// (Over de Stichting / Projecten / Steun ons / Verantwoording met sub-pagina's)
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Over Ons",
    href: "/over-ons",
    children: [
      { label: "Doelstelling", href: "/doelstelling" },
      { label: "Missie", href: "/missie" },
      { label: "Historie", href: "/onze-missie" },
      { label: "Beleidsplan", href: "/beleidsplan" },
      { label: "Organisatie en bestuur", href: "/samenstelling-bestuur" },
    ],
  },
  {
    label: "Projecten",
    href: "/projecten",
    children: [
      { label: "Abayashram – Vision India", href: "/abayashram-vision-india-2" },
      { label: "UWA – Working women's hostel", href: "/working-womens-hostel-uwa" },
      { label: "ASHA Foundation – HIV positieve vrouwen", href: "/hiv-positive-women-asha-foundation" },
    ],
  },
  { label: "Nieuws", href: "/nieuws" },
  {
    label: "Steun Ons",
    href: "/steun-ons",
    children: [
      { label: "Betaalwijze", href: "/betaalwijze" },
      { label: "Contactgegevens", href: "/contactgegevens" },
      { label: "Belastingaftrek schenkingen", href: "/belastingaftrek-schenkingen" },
      { label: "SponsorKliks", href: "/sponsorkliks" },
    ],
  },
  {
    label: "Verantwoording",
    href: "/verantwoording",
    children: [
      { label: "ANBI-verklaring", href: "/betaalwijze-2" },
      { label: "Fiscaal nummer (RSIN)", href: "/rsin" },
      { label: "Beloningsbeleid", href: "/beloningsbeleid" },
      { label: "Financieel overzicht", href: "/financieel-overzicht-2012" },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDesktopIdx, setOpenDesktopIdx] = useState<number | null>(null);
  const [openMobileIdx, setOpenMobileIdx] = useState<number | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMobileIdx(null);
    setOpenDesktopIdx(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isSubActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    return item.children?.some((c) => isActive(c.href)) ?? false;
  };

  const openDropdown = (idx: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDesktopIdx(idx);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDesktopIdx(null), 150);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo-skr.png"
              alt="Stichting Kettingreactie"
              className="h-10 w-auto shrink-0"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Stichting
              </span>
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                Kettingreactie
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item, idx) => {
              const hasChildren = !!item.children?.length;
              const active = isSubActive(item);

              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openDesktopIdx === idx;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openDropdown(idx)}
                  onMouseLeave={scheduleCloseDropdown}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
                    }`}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {isOpen && (
                    <div
                      className="absolute left-0 top-full z-40 mt-1 min-w-[260px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg ring-1 ring-black/5"
                      role="menu"
                    >
                      <div className="p-1.5">
                        {item.children!.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                childActive
                                  ? "bg-primary-50 font-medium text-primary-700"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Leden-portal button */}
          <Link
            href="/leden"
            className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 md:inline-flex"
            title="Leden-portal"
          >
            <User className="h-4 w-4" />
            Leden
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-primary-700 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6 lg:px-8">
            {navItems.map((item, idx) => {
              const hasChildren = !!item.children?.length;
              const active = isSubActive(item);

              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                      active
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openMobileIdx === idx;
              return (
                <div key={item.href}>
                  <div className="flex items-stretch gap-1">
                    <Link
                      href={item.href}
                      className={`flex-1 rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                        active
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`${item.label} submenu ${isOpen ? "sluiten" : "openen"}`}
                      aria-expanded={isOpen}
                      onClick={() => setOpenMobileIdx(isOpen ? null : idx)}
                      className="rounded-lg px-3 text-gray-500 hover:bg-gray-50 hover:text-primary-700"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {isOpen && (
                    <div className="ml-3 mt-1 space-y-1 border-l border-gray-100 pl-3">
                      {item.children!.map((child) => {
                        const childActive = isActive(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                              childActive
                                ? "bg-primary-50 font-medium text-primary-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href="/leden"
              className={`mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                isActive("/leden")
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-primary-700"
              }`}
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
