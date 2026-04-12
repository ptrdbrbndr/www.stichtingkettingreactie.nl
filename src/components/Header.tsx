"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, User, Heart } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

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
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
      data-testid="site-header"
      className={`sticky top-0 z-50 bg-cream/90 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-b border-line shadow-[0_10px_30px_rgba(20,17,46,0.06)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between sm:h-28">
          {/* Logo + wordmark */}
          <Link
            href="/"
            data-testid="site-logo"
            className="group flex items-center gap-4"
          >
            <Image
              src="/logo-skr.png"
              alt="Stichting Kettingreactie"
              width={96}
              height={96}
              priority
              className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent-600 sm:text-sm">
                Stichting
              </span>
              <span className="font-serif text-2xl font-bold text-primary-600 group-hover:text-accent-600 transition-colors sm:text-3xl">
                Kettingreactie
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            data-testid="desktop-nav"
            className="hidden md:flex md:items-center md:gap-1"
          >
            {navItems.map((item, idx) => {
              const hasChildren = !!item.children?.length;
              const active = isSubActive(item);

              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-primary-600"
                        : "text-ink-soft hover:text-accent-600"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent-600"
                      />
                    )}
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
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-primary-600"
                        : "text-ink-soft hover:text-accent-600"
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
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent-600"
                      />
                    )}
                  </Link>

                  {isOpen && (
                    <div
                      data-testid={`nav-dropdown-${idx}`}
                      className="absolute left-0 top-full z-40 mt-1 min-w-[280px] overflow-hidden rounded-2xl border border-line bg-white shadow-xl ring-1 ring-primary-900/5"
                      role="menu"
                    >
                      <div className="p-2">
                        {item.children!.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                childActive
                                  ? "bg-accent-50 font-medium text-accent-700"
                                  : "text-ink-soft hover:bg-cream-dark hover:text-primary-600"
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

          {/* Right side buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/leden"
              data-testid="leden-button"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:border-primary-600 hover:bg-primary-50"
              title="Leden-portal"
            >
              <User className="h-4 w-4" />
              Leden
            </Link>
            <Link
              href="/steun-ons"
              data-testid="doneer-button"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-600 px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-lg active:scale-95"
            >
              <Heart className="h-4 w-4" />
              Doneer
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            className="inline-flex items-center justify-center rounded-lg p-2 text-primary-600 hover:bg-primary-50 md:hidden"
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
        <div
          data-testid="mobile-nav"
          className="border-t border-line bg-cream md:hidden"
        >
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
                        ? "bg-primary-50 text-primary-600"
                        : "text-ink-soft hover:bg-cream-dark hover:text-primary-600"
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
                          ? "bg-primary-50 text-primary-600"
                          : "text-ink-soft hover:bg-cream-dark hover:text-primary-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`${item.label} submenu ${isOpen ? "sluiten" : "openen"}`}
                      aria-expanded={isOpen}
                      onClick={() => setOpenMobileIdx(isOpen ? null : idx)}
                      className="rounded-lg px-3 text-ink-soft hover:bg-cream-dark hover:text-primary-600"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {isOpen && (
                    <div className="ml-3 mt-1 space-y-1 border-l border-line pl-3">
                      {item.children!.map((child) => {
                        const childActive = isActive(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                              childActive
                                ? "bg-accent-50 font-medium text-accent-700"
                                : "text-ink-soft hover:bg-cream-dark hover:text-primary-600"
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
            <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-line">
              <Link
                href="/leden"
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-primary-600"
              >
                <User className="h-4 w-4" />
                Leden-portal
              </Link>
              <Link
                href="/steun-ons"
                className="flex items-center justify-center gap-2 rounded-full bg-accent-600 px-4 py-2 text-sm font-bold text-white shadow-md"
              >
                <Heart className="h-4 w-4" />
                Doneer
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
