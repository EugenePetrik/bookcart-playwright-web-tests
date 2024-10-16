import { join } from 'path';
import { playAudit } from 'playwright-lighthouse';
import type { Page } from '@playwright/test';
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config';

export const lighthouseResults = async (options: {
  page: Page;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  reportName: string;
  isMobile: boolean;
}) => {
  const { performance, accessibility, bestPractices, seo, reportName, isMobile, page } =
    options;

  await playAudit({
    config: isMobile ? undefined : lighthouseDesktopConfig,
    page,
    thresholds: {
      performance,
      accessibility,
      'best-practices': bestPractices,
      seo,
    },
    port: 9222,
    opts: {
      disableStorageReset: false,
      loglevel: 'info',
    },
    reports: {
      formats: {
        html: true,
      },
      name: reportName,
      directory: join(process.cwd(), 'lighthouse-html-report'),
    },
    ignoreError: false,
    disableLogs: false,
  });
};
