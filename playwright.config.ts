import { defineConfig, devices } from '@playwright/test';

/*
 * Portfolio e2e — adapted from the frontend-e2e skill, scaled to a static site.
 * There's no API or database here, so tests run against a real production build
 * (`build` + `start`): the same output that ships. Both projects use the
 * Chromium engine (desktop + a mobile viewport) so only one browser is needed.
 */
const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['list']]
    : [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'pnpm run build && pnpm run start',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
