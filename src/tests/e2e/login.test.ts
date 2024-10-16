import { baseFixture as test } from '../../fixtures';
import { getUser } from '../../utils/getUser';
import type { IUsersConfig } from '../../test_data/users';

const loginTestData: { user: string; title: string }[] = [
  {
    user: 'admin_user',
    title: 'admin user should be able to log in successfully',
  },
  {
    user: 'lead_user',
    title: 'lead user should be able to log in successfully',
  },
];

loginTestData.forEach(({ user, title }) => {
  test(`${title}`, { tag: '@ui' }, async ({ app }) => {
    await app.homePage.open();

    await app.homePage.header.clickOnLogInLink();
    await app.loginPage.expectLoaded();

    const { username, password } = getUser(user as keyof IUsersConfig);
    await app.loginPage.loginUser({ username, password });

    await app.homePage.header.expectLoginSuccess(username);
  });
});

test(
  'user should not log in with invalid credentials',
  { tag: '@ui' },
  async ({ app }) => {
    await app.loginPage.open();

    const { username, password } = { username: 'koushik', password: 'Passkoushik' };
    await app.loginPage.enterUsername(username);
    await app.loginPage.enterPassword(password);
    await app.loginPage.clickOnLogInButton();

    await app.loginPage.expectErrorMessage('Username or Password is incorrect.');
  },
);
