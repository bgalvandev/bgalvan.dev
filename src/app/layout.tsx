import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bgalvan.dev'),
  title: 'Bruno Galván — Software engineer',
  description:
    'Bruno Galván is a software engineer building clear, reliable web software. Selected work and ways to get in touch.',
  openGraph: {
    title: 'Bruno Galván — Software engineer',
    description: 'Software engineer building clear, reliable web software.',
    url: 'https://bgalvan.dev',
    siteName: 'bgalvan.dev',
    type: 'website',
  },
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
