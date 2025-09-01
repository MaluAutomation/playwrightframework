// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
const isHeaded = process.env.HEADED === 'true';
const browserType = process.env.BROWSER || 'chromium';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'], // Built-in HTML reporter
    ['allure-playwright'] // Allure reporter
  ],


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
     headless: !isHeaded, // ✅ Respect HEADED from .env

  },

  /* Configure projects for major browsers */
projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      headless: !isHeaded,
    },
  },
 /* {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      headless: !isHeaded,
    },
  },
  {
    name: 'webkit',
    use: {
      ...devices['Desktop Safari'],
      headless: !isHeaded,
    },
  },*/
],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

