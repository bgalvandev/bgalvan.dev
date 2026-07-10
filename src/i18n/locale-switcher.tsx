'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { locales, type Locale } from './config';
import { setLocale } from './set-locale';

// Leaf control to switch locale. Writes the locale cookie via a Server Action,
// then refreshes so Server Components re-render in the new language.
export function LocaleSwitcher() {
  const active = useLocale();
  const t = useTranslations('nav');
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === active) {
      return;
    }
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label={t('language')}
      className="inline-flex overflow-hidden rounded border border-line font-mono text-xs"
    >
      {locales.map((locale) => {
        const selected = locale === active;
        return (
          <button
            key={locale}
            type="button"
            disabled={pending}
            aria-pressed={selected}
            onClick={() => change(locale)}
            className={`px-2.5 py-1 uppercase transition-colors disabled:opacity-50 ${
              selected
                ? 'bg-accent text-accent-contrast'
                : 'text-muted hover:text-accent'
            }`}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
