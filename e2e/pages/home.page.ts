import type { Page, Locator } from '@playwright/test';

// Page Object for the home page — locators + intent actions, no assertions.
// Locators are role/text based (what a user perceives), never CSS/Tailwind
// classes, so restyling the markup doesn't break the tests.
export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly work: Locator;
  readonly projectEntries: Locator;
  readonly emailLink: Locator;
  readonly githubLink: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { level: 1 });
    this.work = page.getByRole('region', { name: 'Selected work' });
    this.projectEntries = this.work.getByRole('heading', { level: 3 });
    this.emailLink = page.getByRole('link', { name: 'bruno@clinicsay.com' });
    this.githubLink = page.getByRole('link', { name: 'GitHub' });
    this.themeToggle = page.getByRole('button', { name: 'Toggle color theme' });
  }

  async goto() {
    await this.page.goto('/');
  }
}
