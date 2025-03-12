// @ts-check
import { test, expect } from '@playwright/test';
require("dotenv").config();

test('has title', async ({ page }) => {
  if (!process.env.BASE_URL) {
    throw new Error('BASE_URL is not defined in the environment variables');
  }
  await page.goto(process.env.BASE_URL);

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
  await page.waitForTimeout(5000);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
