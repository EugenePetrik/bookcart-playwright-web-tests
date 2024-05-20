import test from '@playwright/test';
import { Application } from '../app';
import { getUser } from '../utils/models/user';
import { type IUsersConfig } from '../test_data/users';

[
  {
    user: 'admin_user',
    title: 'admin user should be able to log in successfully',
  },
  {
    user: 'lead_user',
    title: 'lead user should be able to log in successfully',
  },
].forEach(({ user, title }) => {
  test(`${title}`, { tag: '@ui' }, async ({ page }) => {
    const [username, password] = getUser(user as keyof IUsersConfig);
    const app = new Application(page);

    await app.homePage.open();
    await app.homePage.header.clickOnLogInLink();

    await app.loginPage.expectLoaded();
    await app.loginPage.loginUser(username, password);

    await app.homePage.header.expectLoginSuccess(username);
  });
});
