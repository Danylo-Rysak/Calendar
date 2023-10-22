import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: 'components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
      {
        find: 'store',
        replacement: fileURLToPath(new URL('./src/store', import.meta.url)),
      },
      {
        find: 'core',
        replacement: fileURLToPath(new URL('./src/core', import.meta.url)),
      },
    ],
  },
});
