"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  Image,
  Tag,
  FolderOpen,
  Home,
  Users,
  Navigation,
  BarChart2,
  ChevronDown,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import IssueReportButton from "@/components/IssueReportButton";

interface NavGroup {
  label: string;
  items: {
    href: string;
    label: string;
    icon: React.ElementType;
    active: boolean;
  }[];
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    });
  }, [router, pathname]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
      </div>
    );
  }

  const navGroups: NavGroup[] = [
    {
      label: "Inhoud",
      items: [
        {
          href: "/admin/posts",
          label: "Berichten",
          icon: FileText,
          active: pathname.startsWith("/admin/posts"),
        },
        {
          href: "/admin/pages",
          label: "Pagina's",
          icon: FolderOpen,
          active: pathname.startsWith("/admin/pages"),
        },
        {
          href: "/admin/categories",
          label: "Categorieën",
          icon: Tag,
          active: pathname.startsWith("/admin/categories"),
        },
        {
          href: "/admin/tags",
          label: "Tags",
          icon: Tag,
          active: pathname.startsWith("/admin/tags"),
        },
        {
          href: "/admin/media",
          label: "Media",
          icon: Image,
          active: pathname.startsWith("/admin/media"),
        },
      ],
    },
    {
      label: "Website",
      items: [
        {
          href: "/admin/homepage",
          label: "Homepage",
          icon: Home,
          active: pathname.startsWith("/admin/homepage"),
        },
        {
          href: "/admin/team",
          label: "Team / Bestuur",
          icon: Users,
          active: pathname.startsWith("/admin/team"),
        },
        {
          href: "/admin/navigatie",
          label: "Navigatie",
          icon: Navigation,
          active: pathname.startsWith("/admin/navigatie"),
        },
      ],
    },
    {
      label: "Inzichten",
      items: [
        {
          href: "/admin/analytics",
          label: "Analytics",
          icon: BarChart2,
          active: pathname.startsWith("/admin/analytics"),
        },
        {
          href: "/admin/issues",
          label: "Issues",
          icon: AlertCircle,
          active: pathname.startsWith("/admin/issues"),
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gray-800 transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-lg font-bold text-white">Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Dashboard */}
          <Link
            href="/admin"
            onClick={() => setSidebarOpen(false)}
            data-testid="nav-dashboard"
            className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/admin"
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>

          {navGroups.map((group) => (
            <div key={group.label} className="mt-4">
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {group.label}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    data-testid={`nav-${item.href.replace("/admin/", "")}`}
                    className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-700 p-3 space-y-2">
          <div className="px-1">
            <IssueReportButton source="admin" />
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="flex h-16 items-center gap-4 border-b bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Admin</h1>
        </header>

        <main className="flex-1 overflow-y-auto bg-white p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
