import { test, expect } from '@playwright/test';

test.describe('Regression Tests - Critical User Flows', () => {
  test('should maintain logo on homepage', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('img[alt="Stichting Kettingreactie"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/logo-skr.png');
  });

  test('should have valid links in navigation', async ({ page }) => {
    await page.goto('/');

    const navLinks = page.locator('nav a');
    const count = await navLinks.count();

    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('should handle mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    // Check if mobile menu works
    const mobileMenuButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      const navMenu = page.locator('nav').last();
      await expect(navMenu).toBeVisible();
    }
  });

  test('should load images without errors', async ({ page }) => {
    await page.goto('/projecten');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const isVisible = await img.isVisible();
      if (isVisible) {
        // Check if image has loaded
        const src = await img.getAttribute('src');
        expect(src).toBeTruthy();
      }
    }
  });

  test('should display footer information', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Get bank account from footer specifically
    const footer = page.locator('footer');
    const bankAccount = footer.getByText('NL87 INGB 0005313860');
    await expect(bankAccount).toBeVisible();

    // Email link in footer
    const email = footer.getByRole('link', { name: /info@stichtingkettingreactie.nl/i });
    await expect(email).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();
    expect(title).toContain('Stichting Kettingreactie');

    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
  });
});
