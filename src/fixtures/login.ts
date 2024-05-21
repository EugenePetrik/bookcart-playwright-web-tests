import { test } from '@playwright/test';
import { Application } from '../app';
import { getUser } from '../utils/getUser';
import { baseFixture } from './base';
import type { IRegisterUser, ILoginResponse } from '../utils/types/user';
import UserBuilder from '../utils/models/UserBuilder';

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
    await test.info().attach('Login user data', {
      body: JSON.stringify(defaultUser, null, 4),
      contentType: 'application/json',
    });

    await app.headlessLogin(defaultUser);
    await app.homePage.open();

    await use(app);
  },
});

interface IUserContext {
  user: { userModel: IRegisterUser; createdUser: ILoginResponse };
}

export const loggedInAsNewUserFixture = baseFixture.extend<IUserContext>({
  user: async ({ app }, use) => {
    const userModel = new UserBuilder().build();
    const { username, password } = userModel;

    await test.info().attach('Register user data', {
      body: JSON.stringify(userModel, null, 4),
      contentType: 'application/json',
    });

    await app.api.user.register(userModel);

    const createdUser = await app.headlessLogin({ username, password });

    await test.info().attach('Logged in user data', {
      body: JSON.stringify(createdUser, null, 4),
      contentType: 'application/json',
    });

    await app.homePage.open();

    await use({ userModel, createdUser });
  },
});
