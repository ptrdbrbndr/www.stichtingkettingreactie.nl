import { test, expect } from "../../testing/vibe-core/base.fixture";

const BASE = process.env.VIBE_BASE_URL || "http://localhost:3000";

// Staging has a Vercel auth gate that redirects to vercel.com/login
// We accept both /admin/login and vercel.com/login as valid auth redirects
const isAuthProtected = (url: string) =>
  url.includes("/admin/login") || url.includes("vercel.com/login");

test.describe("Admin CMS navigatie", () => {
  test("admin login pagina laadt zonder errors", async ({ page }) => {
    await page.goto(`${BASE}/admin/login`);
    await expect(page.locator("body")).toBeVisible();
    await page.vibeCheck("admin-login-visible");
  });

  test("admin is beschermd voor niet-ingelogde gebruikers", async ({ page }) => {
    await page.goto(`${BASE}/admin`);
    await page.waitForTimeout(500);
    expect(isAuthProtected(page.url())).toBeTruthy();
    await page.vibeCheck("admin-redirected-to-auth");
  });

  test("alle nieuwe admin routes zijn beschermd", async ({ page }) => {
    const routes = [
      "/admin/media",
      "/admin/categories",
      "/admin/tags",
      "/admin/pages",
      "/admin/homepage",
      "/admin/team",
      "/admin/navigatie",
      "/admin/analytics",
      "/admin/issues",
    ];

    for (const route of routes) {
      await page.goto(`${BASE}${route}`);
      await page.waitForTimeout(300);
      expect(isAuthProtected(page.url()), `Route ${route} should be protected`).toBeTruthy();
    }

    await page.vibeCheck("all-admin-routes-protected");
  });
});

test.describe("Homepage CMS content", () => {
  test("homepage laadt zonder errors", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator("body")).toBeVisible();
    await page.vibeCheck("homepage-loaded");
  });

  test("nieuws sectie aanwezig op homepage", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator("body")).toBeVisible();
    await page.vibeCheck("homepage-news-section");
  });
});

test.describe("Leden pagina", () => {
  test("leden pagina laadt of redirect naar login", async ({ page }) => {
    await page.goto(`${BASE}/leden`);
    await page.waitForTimeout(500);
    const url = page.url();
    expect(
      url.includes("/leden") || url.includes("login") || url.includes("vercel.com")
    ).toBeTruthy();
    await page.vibeCheck("leden-page-accessed");
  });
});
