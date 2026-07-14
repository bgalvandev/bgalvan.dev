import type { Metadata } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

// Self-hosted at build time (no layout shift, no external request at runtime).
// Archivo carries the sans personality; JetBrains Mono is the data/label face
// that does the "engineered" talking (the spec header, years, and eyebrows).
const sans = Archivo({
  subsets: ['latin'],
  variable: '--font-sans-face',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-face',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    metadataBase: new URL('https://bgalvan.dev'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://bgalvan.dev',
      siteName: 'bgalvan.dev',
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
