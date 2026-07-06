import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React Compiler (stable in Next.js 16) auto-memoizes components and hooks at
  // build time, so manual useMemo/useCallback/memo are unnecessary. Requires the
  // babel-plugin-react-compiler dependency. Expect slightly slower builds.
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
  reactCompiler: true,
};

export default nextConfig;
