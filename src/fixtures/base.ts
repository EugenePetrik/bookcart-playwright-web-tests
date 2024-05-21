import { test } from '@playwright/test';
import { Application } from '../app';

export const baseFixture = test.extend<{ app: Application }>({
  app: async ({ browser, page }, use) => {
    test.info().annotations.push({
      type: 'Browser',
      description: `${browser.browserType().name()} ${browser.version()}`,
    });

    const app = new Application(page);
    await use(app);
  },
});
