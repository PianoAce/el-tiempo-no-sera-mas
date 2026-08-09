// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://eltiemponoseramas.com',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.loca.lt']
    }
  }
});