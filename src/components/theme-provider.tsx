'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Owns theme state for the whole app. `attribute="class"` toggles `.dark` on
// <html>; `system` default means the OS preference wins until the user picks.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
