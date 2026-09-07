import { defineConfig } from 'astro/config';

const pages = process.argv.includes('pages') || process.env.DEPLOY_TARGET === 'pages';
export default defineConfig({
  site: pages ? 'https://yimtu.github.io' : 'https://dixios.com',
  base: pages ? '/webdixios' : '/',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
