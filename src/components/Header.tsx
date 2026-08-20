"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
      { label: "Abayashram – Vision India", href: "/projecten/abayashram" },
      { label: "UWA – Working women's hostel", href: "/projecten/uwa-hostel" },
      { label: "ASHA Foundation – HIV-positieve vrouwen", href: "/projecten/asha-foundation" },
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
  const [openDesktopIdx, setOpenDesktopIdx] = useState<number | null>(null);
  const [openMobileIdx, setOpenMobileIdx] = useState<number | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <header data-testid="site-header" className="bg-paper">
      {/* Verantwoordingsregel */}
      <div className="hidden bg-paper-3 sm:block">
        <div className="mx-auto flex max-w-7xl items-baseline justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <p className="kicker text-ink-2">Amsterdam · Bangalore · sinds 2007</p>
          <p className="kicker text-ink-2">
            ANBI · RSIN 821887300 ·{" "}
            <span className="mark-azure text-ink">
              elke euro naar de projecten
            </span>
          </p>
        </div>
      </div>

      {/* Hoofdregel */}
      <div className="border-b border-rule-soft">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            data-testid="site-logo"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/logo-skr-mark.png"
              alt=""
              width={126}
              height={155}
              priority
              className="h-14 w-auto shrink-0 object-contain sm:h-[4.5rem]"
            />
            <span className="flex flex-col gap-0.5">
              <span className="kicker text-magenta">Stichting</span>
              <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.12em] text-ink sm:text-2xl">
                Kettingreactie
              </span>
            </span>
          </Link>

          {/* Navigatie */}
          <nav
            data-testid="desktop-nav"
            className="hidden items-center md:flex"
          >
            {navItems.map((item, idx) => {
              const hasChildren = !!item.children?.length;
              const active = isSubActive(item);
              const testId = `nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-testid={testId}
                    className={`kicker rounded-full px-3.5 py-2.5 transition-colors lg:px-4 ${
                      active
                        ? "bg-paper-3 text-magenta"
                        : "text-ink hover:text-magenta"
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
                    data-testid={testId}
                    className={`kicker flex items-center gap-1.5 rounded-full px-3.5 py-2.5 transition-colors lg:px-4 ${
                      active
                        ? "bg-paper-3 text-magenta"
                        : "text-ink hover:text-magenta"
                    }`}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`text-[0.55rem] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </Link>

                  {isOpen && (
                    <div
                      data-testid={`nav-dropdown-${idx}`}
                      className="absolute left-0 top-full z-40 mt-2 min-w-[270px] rounded-2xl border border-rule-soft bg-paper py-2 shadow-[0_24px_60px_-24px_rgba(30,23,80,0.35)]"
                      role="menu"
                    >
                      {item.children!.map((child) => {
                        const childActive = isActive(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className={`block px-5 py-2.5 text-[0.9375rem] leading-snug transition-colors ${
                              childActive
                                ? "text-magenta"
                                : "text-ink hover:text-magenta"
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
          </nav>

          <div className="hidden shrink-0 items-center gap-5 md:flex">
            <Link
              href="/leden"
              data-testid="leden-button"
              className="kicker text-ink-2 underline decoration-1 underline-offset-4 hover:text-ink"
            >
              Leden
            </Link>
            <Link
              href="/steun-ons"
              data-testid="doneer-button"
              className="pil bg-magenta px-6 py-3 text-paper hover:bg-magenta-deep"
            >
              Doneer
            </Link>
          </div>

          {/* Mobiel menu — hamburger uit drie lijnen */}
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-rule-soft md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              aria-hidden="true"
              className={`h-[2px] w-5 bg-ink transition-transform ${
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`h-[2px] w-5 bg-ink transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`h-[2px] w-5 bg-ink transition-transform ${
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobiele navigatie */}
      {mobileMenuOpen && (
        <div
          data-testid="mobile-nav"
          className="border-b border-rule-soft bg-paper md:hidden"
        >
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="divide-y divide-rule-soft">
              {navItems.map((item, idx) => {
                const hasChildren = !!item.children?.length;
                const active = isSubActive(item);

                if (!hasChildren) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`kicker block py-3.5 ${
                          active ? "text-magenta" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const isOpen = openMobileIdx === idx;
                return (
                  <li key={item.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`kicker block flex-1 py-3.5 ${
                          active ? "text-magenta" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`${item.label} submenu ${isOpen ? "sluiten" : "openen"}`}
                        aria-expanded={isOpen}
                        onClick={() => setOpenMobileIdx(isOpen ? null : idx)}
                        className="px-4 py-3.5 text-ink"
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-block text-[0.55rem] transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▾
                        </span>
                      </button>
                    </div>
                    {isOpen && (
                      <ul className="mb-3 ml-4 border-l border-rule-soft pl-4">
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block py-2 text-[1.0625rem] ${
                                isActive(child.href)
                                  ? "text-magenta"
                                  : "text-ink"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center gap-6 border-t border-rule-soft pt-4">
              <Link
                href="/steun-ons"
                className="pil bg-magenta px-6 py-3 text-paper"
              >
                Doneer
              </Link>
              <Link
                href="/leden"
                className="kicker text-ink-2 underline decoration-1 underline-offset-4"
              >
                Leden
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
