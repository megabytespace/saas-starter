import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 1,
  use: {
    baseURL: process.env.PROD_URL ?? 'http://localhost:8787',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'iPhone SE', use: { ...devices['iPhone SE'] } },
    { name: 'iPhone 14', use: { viewport: { width: 390, height: 844 } } },
    { name: 'iPad', use: { ...devices['iPad (gen 7)'] } },
    { name: 'iPad Landscape', use: { viewport: { width: 1024, height: 768 } } },
    { name: 'Laptop', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'Desktop', use: { viewport: { width: 1920, height: 1080 } } },
  ],
});
