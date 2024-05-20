import { defineConfig, devices } from '@playwright/test';
import { join } from 'path';
import dotenv from 'dotenv';
import baseConfig from './src/config/baseConfig';

if (process.env.ENV) {
  dotenv.config({
    path: `.env.${process.env.ENV}`,
    override: true,
  });
}

export default defineConfig({
  testDir: join(process.cwd(), 'src', 'tests'),

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  maxFailures: process.env.CI ? 5 : 10,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  globalSetup: join(process.cwd(), 'src', 'tests', 'global-setup.ts'),

  reporter: [
    ['list', { printSteps: true }],
    ['html', { open: 'never' }],
    [join(process.cwd(), 'src', 'utils', 'reporters', 'CustomReporterConfig.ts')],
    [join(process.cwd(), 'src', 'utils', 'reporters', 'SlowStepReporter.ts')],
  ],

  timeout: 30_000,

  expect: {
    timeout: 10_000,
  },

  use: {
    trace: {
      mode: 'retain-on-failure',
    },

    screenshot: {
      fullPage: true,
      mode: 'only-on-failure',
    },

    video: {
      mode: 'retain-on-failure',
    },

    headless: !!process.env.CI,

    launchOptions: {
      slowMo: 0,
    },

    ignoreHTTPSErrors: true,

    acceptDownloads: true,

    actionTimeout: 5_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: baseConfig.WEB_URL,
      },
      grep: [new RegExp('@ui')],
    },

    {
      name: 'api',
      use: {
        baseURL: baseConfig.API_URL,
      },
    },
  ],
});