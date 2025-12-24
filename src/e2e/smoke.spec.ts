import { test, expect } from '@playwright/test';

test('smoke test - playwright works', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
