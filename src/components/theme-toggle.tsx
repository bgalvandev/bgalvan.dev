'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

// The label is driven purely by the `.dark` class (Tailwind `dark:` variant),
// so there's no client state to hydrate and no theme-flash mismatch. The click
// handler runs only after hydration, where `resolvedTheme` is defined. The
// button shows the theme it switches TO.
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations('nav');

  return (
    <button
      type="button"
      aria-label={t('themeToggle')}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span className="dark:hidden">{t('themeToDark')}</span>
      <span className="hidden dark:inline">{t('themeToLight')}</span>
    </button>
  );
}
