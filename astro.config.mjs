import { defineConfig } from 'astro/config';

const CODESPACE_PORT = 4321;
const codespaceHost =
  process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
    ? `${process.env.CODESPACE_NAME}-${CODESPACE_PORT}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
    : undefined;

export default defineConfig({
  site: 'https://yimtu.github.io',
  base: '/webdixios',
  output: 'static',
  server: {
    host: true,
    port: CODESPACE_PORT,
    allowedHosts: codespaceHost ? [codespaceHost] : []
  },
  vite: {
    server: {
      strictPort: true
    }
  },
  build: {
    assets: '_assets'
  }
});
