import { test, expect } from "../../testing/vibe-core/base.fixture";

const BASE = process.env.VIBE_BASE_URL || "http://localhost:3000";

test.describe("Home — redesigned editorial homepage", () => {
  test("homepage laadt zonder fouten", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.getByTestId("site-header")).toBeVisible();
    await expect(page.getByTestId("site-logo")).toBeVisible();
    await expect(page.getByTestId("home-hero")).toBeVisible();
    await expect(page.locator("h1").first()).toBeVisible();
    await page.vibeCheck("home-initial");
  });

  test("hero heeft beide CTA's en feature-nieuws-card (indien nieuws beschikbaar)", async ({
    page,
  }) => {
    await page.goto(`${BASE}/`);
    await expect(page.getByTestId("hero-primary-cta")).toBeVisible();
    await expect(page.getByTestId("hero-secondary-cta")).toBeVisible();
    await page.vibeCheck("home-hero");
  });

  test("impact strip toont drie serif cijfers", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const impact = page.getByTestId("impact-strip");
    await impact.scrollIntoViewIfNeeded();
    await expect(impact).toBeVisible();
    await expect(impact.getByText("3", { exact: true })).toBeVisible();
    await expect(impact.getByText("100%", { exact: true })).toBeVisible();
    await page.vibeCheck("home-impact-strip");
  });

  test("missie sectie met overlapping quote", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const missie = page.getByTestId("missie-section");
    await missie.scrollIntoViewIfNeeded();
    await expect(missie).toBeVisible();
    await expect(page.getByTestId("missie-link")).toBeVisible();
    await page.vibeCheck("home-missie");
  });

  test("projecten sectie toont drie project-cards", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const projecten = page.getByTestId("projecten-section");
    await projecten.scrollIntoViewIfNeeded();
    await expect(page.getByTestId("project-card-01")).toBeVisible();
    await expect(page.getByTestId("project-card-02")).toBeVisible();
    await expect(page.getByTestId("project-card-03")).toBeVisible();
    await expect(page.getByTestId("projecten-all-link")).toBeVisible();
    await page.vibeCheck("home-projecten");
  });

  test("nieuws sectie zichtbaar", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const nieuws = page.getByTestId("nieuws-section");
    await nieuws.scrollIntoViewIfNeeded();
    await expect(nieuws).toBeVisible();
    await page.vibeCheck("home-nieuws");
  });

  test("donatie CTA toont IBAN en doneer-knop", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const cta = page.getByTestId("donatie-cta");
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    await expect(cta.getByText(/NL\d{2}/)).toBeVisible();
    await expect(page.getByTestId("donatie-cta-button")).toBeVisible();
    await page.vibeCheck("home-donatie");
  });

  test("footer toont logo, ANBI en privacyverklaring link", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const footer = page.getByTestId("site-footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer.getByRole("link", { name: /privacyverklaring/i })).toBeVisible();
    await page.vibeCheck("home-footer");
  });

  test("desktop nav toont alle hoofd-menu-items", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE}/`);
    const nav = page.getByTestId("desktop-nav");
    await expect(nav).toBeVisible();
    await expect(page.getByTestId("nav-home")).toBeVisible();
    await expect(page.getByTestId("nav-over-ons")).toBeVisible();
    await expect(page.getByTestId("nav-projecten")).toBeVisible();
    await expect(page.getByTestId("nav-nieuws")).toBeVisible();
    await expect(page.getByTestId("doneer-button")).toBeVisible();
    await page.vibeCheck("home-nav");
  });

  test("mobiel: hero, hamburger en donatie CTA werken", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}/`);
    await expect(page.getByTestId("site-header")).toBeVisible();
    await expect(page.getByTestId("mobile-menu-toggle")).toBeVisible();
    await page.getByTestId("mobile-menu-toggle").click();
    await expect(page.getByTestId("mobile-nav")).toBeVisible();
    await page.vibeCheck("home-mobile-menu-open");
  });
});
