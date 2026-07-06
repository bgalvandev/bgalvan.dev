import { join } from 'path';
import type { Config } from 'tailwindcss';

/**
 * bgalvan.dev — portfolio design tokens.
 * Colors are indirected through CSS variables (see src/app/globals.css) so the
 * same tokens carry both the light and dark palettes. The identity: near-black
 * ink on soft paper, a single confident blue accent, and a mono face that does
 * the "engineered" talking (labels, years, the spec-sheet header).
 */
const config: Config = {
  // Absolute glob so class detection is independent of the build CWD.
  content: [join(__dirname, 'src/**/*.{ts,tsx}')],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        line: 'var(--line)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-contrast': 'var(--accent-contrast)',
      },
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
