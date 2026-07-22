import { defineConfig } from 'vite';
import { timber } from '@timber-js/app';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [timber(), tailwindcss()],
  resolve: {
    alias: {
      '@/components': path.resolve(import.meta.dirname, 'src/components'),
      '@/ui': path.resolve(import.meta.dirname, 'src/components/ui'),
      '@/lib': path.resolve(import.meta.dirname, 'src/lib'),
      '@/app': path.resolve(import.meta.dirname, 'src/app'),
      '@/public': path.resolve(import.meta.dirname, 'public'),
      '@': path.resolve(import.meta.dirname, 'src'),
      '@takumi-rs/wasm/auto': '@takumi-rs/wasm/vite',
    },
  },
});
