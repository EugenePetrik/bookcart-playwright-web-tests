import { test } from '@playwright/test';
import { API } from '../api/api';
import { PageHolder } from './abstract.classes';
import { SearchPage } from './page/search.page';
import { HomePage } from './page/home/home.page';
import { LoginPage } from './page/login.page';
import { RegisterPage } from './page/register.page';

export class Application extends PageHolder {
  public readonly api = new API(this.page.request);

  public readonly homePage = new HomePage(this.page);

  public readonly registerPage = new RegisterPage(this.page);

  public readonly loginPage = new LoginPage(this.page);

  public readonly searchPage = new SearchPage(this.page);

  async headlessLogin(data: { username: string; password: string }) {
    const userData = await this.api.login.login(data);
    const {
      token,
      userDetails: { userId },
    } = userData;

    // Update the context in API
    this.api.updateRequestContext(this.api.login.request);

    await this.setDataToLocalStorage(userId, token);

    await test.info().attach('Credentials used for headless login', {
      body: JSON.stringify(data, null, 4),
      contentType: 'application/json',
    });

    return userData;
  }

  async setDataToLocalStorage(userId: string, token: string) {
    await this.page.goto('/', { waitUntil: 'commit' });
    await this.page.evaluate(
      _userId => window.localStorage.setItem('userId', _userId),
      userId,
    );
    await this.page.evaluate(
      _token => window.localStorage.setItem('authToken', _token),
      token,
    );
  }
}
