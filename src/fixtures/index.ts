import { test } from '@playwright/test';
import { Application } from '../app';
import { getUser } from '../utils/getUser';

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

export type DefaultUserOption = {
  defaultUser: {
    username: string;
    password: string;
  };
};

export const loggedUserFixture = baseFixture.extend<
  DefaultUserOption & { app: Application }
>({
  defaultUser: [
    {
      username: getUser('admin_user').username,
      password: getUser('admin_user').password,
    },
    { option: true },
  ],

  app: async ({ app, defaultUser }, use) => {
    await app.loginPage.open();
    await app.loginPage.loginUser(defaultUser);
    await app.homePage.expectLoaded();

    await use(app);
  },
});
