import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: process.env.TEST_URL || 'http://127.0.0.1:4321',
    headless: true,
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    },
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
