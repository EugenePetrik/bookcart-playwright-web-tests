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
    ['list', { printSteps: false }],
    ['html', { open: 'never' }],
    // [join(process.cwd(), 'src', 'utils', 'reporters', 'CustomReporterConfig.ts')],
    // [join(process.cwd(), 'src', 'utils', 'reporters', 'SlowStepReporter.ts')],
  ],

  timeout: 30_000,

  expect: {
    timeout: 10_000,
  },

  use: {
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
      name: 'e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: baseConfig.WEB_URL,
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
      },
      grep: [new RegExp('@ui')],
      testDir: join(process.cwd(), 'src', 'tests', 'e2e'),
    },
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: baseConfig.WEB_URL,
      },
      grep: [new RegExp('@accessibility')],
      testDir: join(process.cwd(), 'src', 'tests', 'accessibility'),
    },
    {
      name: 'lighthouse',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: baseConfig.WEB_URL,
      },
      grep: [new RegExp('@performance')],
      testDir: join(process.cwd(), 'src', 'tests', 'lighthouse'),
    },
    {
      name: 'visual',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        baseURL: baseConfig.WEB_URL,
      },
      grep: [new RegExp('@visual')],
      testDir: join(process.cwd(), 'src', 'tests', 'visual'),
    },
  ],
});
