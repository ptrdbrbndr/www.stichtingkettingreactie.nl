import { test as base, expect, type Page } from "@playwright/test";

// Extend the Page type with vibeCheck
declare module "@playwright/test" {
  interface Page {
    vibeCheck(checkpoint: string): Promise<void>;
  }
}

// Base fixture that adds vibeCheck to every page
export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    // Add vibeCheck helper to page
    page.vibeCheck = async (checkpoint: string) => {
      // Check for console errors captured so far
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text());
        }
      });

      // Take a screenshot at this checkpoint
      await page.screenshot({
        path: `test-results/vibe-${checkpoint.replace(/[^a-z0-9]/gi, "-")}-${Date.now()}.png`,
      });

      // Assert no uncaught JS errors
      await expect(page.locator("body")).not.toContainText(
        "Application error",
        { ignoreCase: true }
      );
    };

    await use(page);
  },
});

export { expect };
