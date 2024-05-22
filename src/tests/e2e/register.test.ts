import { baseFixture as test } from '../../fixtures';
import UserBuilder from '../../utils/models/UserBuilder';

test(
  'user should be able to registered successfully',
  { tag: '@ui' },
  async ({ app }) => {
    await app.registerPage.open();

    const user = new UserBuilder().build();
    await app.registerPage.registerUser(user);

    await app.loginPage.expectToHaveURL(/login/);
  },
);
