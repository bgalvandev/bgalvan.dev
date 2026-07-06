import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

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

  test('applies the dark palette under a dark color scheme', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    const home = new HomePage(page);
    await home.goto();

    // The dark token flips via @media (prefers-color-scheme: dark) in globals.css.
    const paper = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--paper')
        .trim(),
    );
    expect(paper).toBe('#121114');
  });
});
