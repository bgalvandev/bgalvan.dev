import { join } from 'path';
import type { Config } from 'tailwindcss';

/**
 * bgalvan.dev — portfolio design tokens.
 * A restrained, editorial base: near-black ink on warm paper, a single accent,
 * and a mono face for code/labels. Treat these as a starting palette to make
 * your own — the point is one deliberate identity, not template defaults.
 */
const config: Config = {
  // Absolute glob so class detection is independent of the build CWD.
  content: [join(__dirname, 'src/**/*.{ts,tsx}')],
  theme: {
    extend: {
      colors: {
        ink: '#111110',
        paper: '#FAF9F6',
        surface: '#F2F0EA',
        line: '#E3E0D8',
        muted: '#6B6A63',
        accent: '#3B5BDB',
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
