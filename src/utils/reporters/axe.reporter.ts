import { TestInfo } from '@playwright/test';
import { AxeResults } from 'axe-core';

export const attachAxeReport = async (scanResults: AxeResults, testInfo: TestInfo) => {
  if (scanResults.violations.length > 0) {
    await testInfo.attach('Accessibility scan results', {
      body: JSON.stringify(scanResults.violations, null, 4),
      contentType: 'application/json',
    });
  }
};
