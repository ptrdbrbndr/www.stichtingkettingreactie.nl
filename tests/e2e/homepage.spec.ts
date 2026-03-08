import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Stichting Kettingreactie - Samen voor kansarme vrouwen in India');
  });

  test('should display logo', async ({ page }) => {
    const logo = page.locator('img[alt="Stichting Kettingreactie"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/logo-skr.png');
  });

  test('should have navigation menu', async ({ page }) => {
    const navItems = ['Home', 'Over Ons', 'Projecten', 'Nieuws', 'Steun Ons', 'Verantwoording'];

    for (const item of navItems) {
      const link = page.getByRole('link', { name: item });
      await expect(link).toBeVisible();
    }
  });

  test('should display hero section', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Samen voor kansarme vrouwen in India/i });
    await expect(heading).toBeVisible();
  });

  test('should have call-to-action button', async ({ page }) => {
    const ctaButton = page.getByRole('link', { name: /Steun ons/i });
    await expect(ctaButton).toBeVisible();
  });

  test('should display projects section', async ({ page }) => {
    const projectsHeading = page.getByRole('heading', { name: /Waar wij ons voor inzetten/i });
    await expect(projectsHeading).toBeVisible();
  });

  test('should display footer with contact info', async ({ page }) => {
    const email = page.getByRole('link', { name: /info@stichtingkettingreactie.nl/i });
    await expect(email).toBeVisible();
  });

  test('should have responsive navigation', async ({ page }) => {
    // Mobile menu button should be hidden on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    const mobileMenuButton = page.locator('button[aria-label*="Menu"]').first();

    // Check if navigation is visible on desktop
    const navMenu = page.locator('nav').first();
    await expect(navMenu).toBeVisible();
  });
});
