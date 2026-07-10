import type { Locale } from './config';
import type enMessages from './messages/en.json';

// Type-safe next-intl (official v4 AppConfig augmentation): unknown message keys
// (`t('nope')`) and unknown locales become compile-time errors. Messages are
// typed against the `en` catalog; the es/en key-parity test (messages.spec.ts)
// keeps the other locale in lockstep, so a type-valid key is never missing at
// runtime in `es`.
declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof enMessages;
  }
}
