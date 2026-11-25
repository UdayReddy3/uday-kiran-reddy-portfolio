import { defineConfig } from 'vite';

// base './' keeps asset paths relative, so the build works on Vercel,
// GitHub Pages (including project sub-paths) and any static host.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
