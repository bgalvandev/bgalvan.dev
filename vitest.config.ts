import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Resolve the `@/*` path alias from tsconfig.json natively (Vite 8+).
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    name: 'web',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
    },
  },
});
