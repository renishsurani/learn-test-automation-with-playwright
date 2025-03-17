// @ts-check
import { test, expect } from "@playwright/test";

require("dotenv").config();

test("has title", async ({ page }) => {
	await page.goto("wp-admin");
	await page.waitForTimeout(5000);
});
