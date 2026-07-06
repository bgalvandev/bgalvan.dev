import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bruno Galván — Portfolio',
  description:
    'Personal portfolio of Bruno Galván — software engineer. Selected work, writing, and ways to get in touch.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
