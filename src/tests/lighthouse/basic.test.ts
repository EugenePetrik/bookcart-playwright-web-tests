import { lighthouseFixture as test } from '../../fixtures';
import { lighthouseResults } from '../../utils/reporters/lighthouse.reporter';
import {
  LIGHTHOUSE_DESKTOP_LINKS,
  LIGHTHOUSE_MOBILE_LINKS,
} from '../../test_data/lighthouse';

[...LIGHTHOUSE_DESKTOP_LINKS, ...LIGHTHOUSE_MOBILE_LINKS].forEach(
  ({
    pageName,
    performance,
    accessibility,
    bestPractices,
    seo,
    isMobile,
    reportName,
  }) => {
    test(
      // eslint-disable-next-line playwright/no-conditional-in-test
      `Lighthouse verification for ${pageName} on ${isMobile ? 'mobile' : 'desktop'}`,
      { tag: ['@performance'] },
      async ({ app, page, attachReport }) => {
        await test.step('Open page', async () => {
          await app.homePage.open();
        });

        try {
          await test.step('Generate lighthouse results', async () => {
            await lighthouseResults({
              page,
              performance,
              accessibility,
              bestPractices,
              seo,
              reportName,
              isMobile,
            });
          });
        } finally {
          await test.step('Attach lighthouse report', () => {
            attachReport(reportName);
          });
        }
      },
    );
  },
);
