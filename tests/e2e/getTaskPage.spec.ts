import { test, expect } from "@playwright/test";

test.describe("Tasks Page ", () => {
  test("loads the main app and navigates to /en/tasks/", async ({ page }) => {
    // Click the link or button that navigates to the tasks page
    // Replace 'Tasks' with the actual text or selector of the link/button
    await page.goto("https://task-manager-ab-test.vercel.app/");
    await page.click("text=Tasks");

    // Verify the URL
    const url = page.url();
    expect(url).toContain("/en/tasks");
  });

  test("renders 30 cards on the tasks page", async ({ page }) => {
    // Navigate directly to the tasks page
    await page.goto("http://localhost:3000/en/tasks/");

    // Wait for the cards to be visible
    // Wait for the cards to be visible using data-testid
    // Replace 'task-card' with the actual data-testid value of the cards
    await page.waitForSelector('[data-testid="task-card"]');

    // Count the cards
    const cards = await page.$$('[data-testid="task-card"]');
    expect(cards.length).toBe(30);
  });
});
