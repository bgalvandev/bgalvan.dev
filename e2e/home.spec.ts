import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

// Pin the locale to English so structural assertions are stable regardless of
// the configured default locale. The language-switch test overrides it.
test.beforeEach(async ({ context }) => {
  await context.addCookies([
    { name: 'NEXT_LOCALE', value: 'en', url: 'http://localhost:3000' },
  ]);
});

test.describe('home page', () => {
  test('shows the hero, work, and contact', { tag: '@smoke' }, async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.heading).toHaveText(/stays clear as it grows/i);
    await expect(home.work).toBeVisible();
    await expect(home.projectEntries).toHaveCount(3);

    await expect(home.emailLink).toHaveAttribute(
      'href',
      'mailto:bruno@clinicsay.com',
    );
    await expect(home.githubLink).toHaveAttribute(
      'href',
      'https://github.com/bgalvandev',
    );
  });

  test('follows a dark OS preference by default', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    const home = new HomePage(page);
    await home.goto();

    await expect(page.locator('html')).toHaveClass(/dark/);
    const paper = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--paper')
        .trim(),
    );
    expect(paper).toBe('#121114');
  });

  test('the toggle switches theme and back', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    const home = new HomePage(page);
    await home.goto();
    const html = page.locator('html');

    await expect(html).not.toHaveClass(/dark/);
    await home.themeToggle.click();
    await expect(html).toHaveClass(/dark/);
    await home.themeToggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('switches language to Spanish', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.heading).toHaveText(/stays clear as it grows/i);
    await home.localeSwitcher
      .getByRole('button', { name: 'es', exact: true })
      .click();
    await expect(home.heading).toHaveText(/se mantiene claro/i);
  });
});
