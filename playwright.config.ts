import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  timeout: 30_000,
  retries: 0,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:3000', // Grafana 地址
    httpCredentials: {
      username: 'admin',
      password: 'admin',
    },
  },
});
