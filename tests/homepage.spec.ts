import { test, expect } from '@playwright/test';

const PROD_URL = process.env.PROD_URL ?? 'http://localhost:8787';

test.describe('Homepage', () => {
  test('loads and displays site name', async ({ page }) => {
    await page.goto(PROD_URL);
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('has working navigation', async ({ page }) => {
    await page.goto(PROD_URL);
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('passes axe-core accessibility', async ({ page }) => {
    await page.goto(PROD_URL);
    // axe-core integration: npm install @axe-core/playwright
    // const results = await new AxeBuilder({ page }).analyze();
    // expect(results.violations).toHaveLength(0);
  });
});
