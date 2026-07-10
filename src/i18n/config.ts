// i18n configuration. Locales carry NO URL prefix; the active locale lives in a
// cookie (resolved per request in request.ts). To change the default language,
// flip `defaultLocale` — every string exists in both catalogs.
export const locales = ['es', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

// next-intl's conventional locale cookie name.
export const localeCookieName = 'NEXT_LOCALE';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}
