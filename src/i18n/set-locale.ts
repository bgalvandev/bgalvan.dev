'use server';

import { cookies } from 'next/headers';

import { isLocale, localeCookieName, type Locale } from './config';

// Server Action: persist the chosen locale in the cookie that request.ts reads.
// The caller triggers a router refresh so Server Components re-render in the new
// language.
export async function setLocale(locale: Locale): Promise<void> {
  if (!isLocale(locale)) {
    return;
  }

  (await cookies()).set(localeCookieName, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}
