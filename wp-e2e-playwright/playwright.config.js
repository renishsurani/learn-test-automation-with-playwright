// @ts-check
import { defineConfig, devices } from "@playwright/test";

import path from "path";

import { fileURLToPath } from "url";

require("dotenv").config();

const STORAGE_STATE_PATH =
    process.env.STORAGE_STATE_PATH ||
    path.join(process.cwd(), "artifacts/storage-states/admin.json");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    /* Directory where the test files are located. */
    testDir: fileURLToPath(new URL("./specs", "file:" + __filename).href),

    /* Directory where the test files are located. */
    globalSetup: fileURLToPath(
        new URL("./config/global-setup.js", "file:" + __filename).href
    ),

    /* Retry failed tests up to 2 times. */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",

    use: {
        headless: false,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.WP_BASE_URL || "",

        storageState: STORAGE_STATE_PATH,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        // {
        //     name: "firefox",
        //     use: { ...devices["Desktop Firefox"] },
        // },

        // {
        //     name: "webkit",
        //     use: { ...devices["Desktop Safari"] },
        // },
    ]
});
