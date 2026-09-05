import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yimtu.github.io',
  base: '/webdixios',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
