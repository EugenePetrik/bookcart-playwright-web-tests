import { chromium } from '@playwright/test';
import { join } from 'path';
import { baseFixture } from './base';

export const lighthouseFixture = baseFixture.extend<{
  attachReport: (reportName: string) => void;
}>({
  page: async ({}, use) => {
    const browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await use(page);

    await page.close();
    await context.close();
    await browser.close();
  },

  attachReport: async ({}, use, testInfo) => {
    let reportName = '';

    await use((newReportName: string) => {
      reportName = newReportName;
    });

    if (reportName) {
      const reportPath = join(
        process.cwd(),
        'lighthouse-html-report',
        `${reportName}.html`,
      );
      await testInfo.attach('lighthouse-report', { path: reportPath });
    }
  },
});
