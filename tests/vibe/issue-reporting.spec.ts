import { test, expect } from "../../testing/vibe-core/base.fixture";

const BASE = process.env.VIBE_BASE_URL || "http://localhost:3000";

test.describe("Publieke pagina's", () => {
  test("nieuws pagina laadt", async ({ page }) => {
    await page.goto(`${BASE}/nieuws`);
    await expect(page.locator("h1")).toBeVisible();
    await page.vibeCheck("nieuws-page");
  });

  test("over ons pagina laadt", async ({ page }) => {
    await page.goto(`${BASE}/over-ons`);
    await expect(page.locator("h1")).toBeVisible();
    await page.vibeCheck("over-ons-page");
  });

  test("projecten pagina laadt", async ({ page }) => {
    await page.goto(`${BASE}/projecten`);
    await expect(page.locator("body")).toBeVisible();
    await page.vibeCheck("projecten-page");
  });

  test("steun ons pagina laadt", async ({ page }) => {
    await page.goto(`${BASE}/steun-ons`);
    await expect(page.locator("body")).toBeVisible();
    await page.vibeCheck("steun-ons-page");
  });

  test("contact pagina laadt", async ({ page }) => {
    await page.goto(`${BASE}/contact`);
    await expect(page.locator("body")).toBeVisible();
    await page.vibeCheck("contact-page");
  });

  test("leden login pagina laadt", async ({ page }) => {
    await page.goto(`${BASE}/leden/login`);
    await expect(page.locator("body")).toBeVisible();
    await page.vibeCheck("leden-login-page");
  });
});
