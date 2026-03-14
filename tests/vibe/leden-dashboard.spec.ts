import { test, expect } from "../../testing/vibe-core/base.fixture";

const BASE = process.env.VIBE_BASE_URL || "http://localhost:3000";

const SUPABASE_URL = "https://flwdwnefhfjagibvjpqh.supabase.co";
const SUPABASE_PROJECT_REF = "flwdwnefhfjagibvjpqh";

const fakeUser = {
  id: "test-user-id",
  email: "test@example.com",
  user_metadata: { full_name: "Test Lid" },
  created_at: "2024-01-01T00:00:00Z",
  aud: "authenticated",
  role: "authenticated",
};

const fakeSession = {
  access_token: "fake-access-token",
  refresh_token: "fake-refresh-token",
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: "bearer",
  user: fakeUser,
};

// Mock een ingelogde leden-sessie via cookies + Supabase API intercept
async function mockLedenAuth(page: import("@playwright/test").Page) {
  // @supabase/ssr slaat sessies op als cookies met base64url encoding
  const cookieName = `sb-${SUPABASE_PROJECT_REF}-auth-token`;
  const sessionJson = JSON.stringify(fakeSession);
  const cookieValue = "base64-" + Buffer.from(sessionJson).toString("base64url");

  await page.context().addCookies([
    {
      name: cookieName,
      value: cookieValue,
      domain: "localhost",
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);

  // Mock alle Supabase auth endpoints (getUser, refresh, etc.)
  await page.route(`${SUPABASE_URL}/auth/v1/**`, (route) => {
    const url = route.request().url();
    if (url.includes("/auth/v1/user")) {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeUser),
      });
    } else if (url.includes("/auth/v1/token")) {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeSession),
      });
    } else {
      route.continue();
    }
  });

  // Mock getIssues — return lege lijst
  await page.route(`${SUPABASE_URL}/rest/v1/issues**`, (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
      headers: { "content-range": "0-0/0" },
    });
  });
}

// Wacht totdat de dashboard buttons zichtbaar zijn (= auth is gelukt)
async function waitForDashboard(page: import("@playwright/test").Page) {
  await page.waitForSelector('[data-testid="logout-btn"]', { timeout: 15000 });
}

test.describe("Leden dashboard", () => {
  test("leden login pagina laadt", async ({ page }) => {
    await page.goto(`${BASE}/leden/login`);
    await expect(page.locator("body")).toBeVisible();
    await page.vibeCheck("leden-login");
  });

  test("leden is beschermd voor niet-ingelogde gebruikers", async ({ page }) => {
    await page.goto(`${BASE}/leden`);
    // Wacht totdat de client-side auth check de redirect triggert
    await page.waitForURL(`**leden/login**`, { timeout: 15000 });
    await page.vibeCheck("leden-auth-redirect");
  });

  test("knop 'Probleem melden' heeft oranje achtergrond", async ({ page }) => {
    await mockLedenAuth(page);
    await page.goto(`${BASE}/leden`);
    await waitForDashboard(page);

    const btn = page.getByTestId("report-issue-btn");
    await expect(btn).toBeVisible();

    const classes = await btn.getAttribute("class");
    expect(classes).toContain("bg-orange-500");

    await page.vibeCheck("probleem-melden-knop-oranje");
  });

  test("knop 'Uitloggen' heeft rode achtergrond", async ({ page }) => {
    await mockLedenAuth(page);
    await page.goto(`${BASE}/leden`);
    await waitForDashboard(page);

    const btn = page.getByTestId("logout-btn");
    await expect(btn).toBeVisible();

    const classes = await btn.getAttribute("class");
    expect(classes).toContain("bg-red-600");

    await page.vibeCheck("uitloggen-knop-rood");
  });

  test("'Probleem melden' en 'Uitloggen' hebben verschillende kleuren", async ({
    page,
  }) => {
    await mockLedenAuth(page);
    await page.goto(`${BASE}/leden`);
    await waitForDashboard(page);

    const reportBtn = page.getByTestId("report-issue-btn");
    const logoutBtn = page.getByTestId("logout-btn");

    await expect(reportBtn).toBeVisible();
    await expect(logoutBtn).toBeVisible();

    const reportClasses = await reportBtn.getAttribute("class") ?? "";
    const logoutClasses = await logoutBtn.getAttribute("class") ?? "";

    // Oranje vs rood — klassen mogen niet identiek zijn
    expect(reportClasses).not.toBe(logoutClasses);

    await page.vibeCheck("knoppen-verschillende-kleuren");
  });

  test("tegel 'Openstaande meldingen' is zichtbaar", async ({ page }) => {
    await mockLedenAuth(page);
    await page.goto(`${BASE}/leden`);
    await waitForDashboard(page);

    const tile = page.getByTestId("issues-tile");
    await expect(tile).toBeVisible();

    await page.vibeCheck("issues-tegel-zichtbaar");
  });

  test("klikken op tegel toont de issuelijst", async ({ page }) => {
    await mockLedenAuth(page);
    await page.goto(`${BASE}/leden`);
    await waitForDashboard(page);

    const tile = page.getByTestId("issues-tile");
    await expect(tile).toBeVisible();

    // Panel is nog niet zichtbaar
    await expect(page.getByTestId("issue-list-panel")).not.toBeVisible();

    await tile.click();
    await expect(page.getByTestId("issue-list-panel")).toBeVisible();

    await page.vibeCheck("issues-panel-geopend");
  });
});
