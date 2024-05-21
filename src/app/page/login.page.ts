import { expect, test } from '@playwright/test';
import { AppPage } from '../abstract.classes';
import baseConfig from '../../config/baseConfig';
import { step } from '../../utils/reporters/steps';
import { type IUser } from '../../test_data/users';

export class LoginPage extends AppPage {
  public readonly pagePath = '/login';

  private readonly userNameInput = this.page.getByPlaceholder('Username');

  private readonly passwordInput = this.page.getByPlaceholder('Password');

  private readonly loginButton = this.page
    .locator('mat-card')
    .getByRole('button', { name: 'Login' });

  private readonly errorMessage = this.page.locator('mat-error');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.userNameInput).toBeVisible(),
      await expect(this.passwordInput).toBeVisible(),
      await expect(this.loginButton).toBeVisible(),
    ]);
  }

  @step()
  async enterUsername(text: string): Promise<void> {
    await this.userNameInput.fill(text);
  }

  @step()
  async enterPassword(text: string): Promise<void> {
    await this.passwordInput.fill(text);
  }

  @step()
  async clickOnLogInButton(): Promise<void> {
    const responsePromise = this.page.waitForResponse(`${baseConfig.WEB_URL}/api/login`);
    await this.loginButton.click();
    await responsePromise;
  }

  @step()
  async expectErrorMessage(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(text);
  }

  @step()
  async loginUser(data: IUser): Promise<void> {
    const { username, password } = data;

    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickOnLogInButton();

    await test.info().attach('Login user data', {
      body: JSON.stringify(data, null, 4),
      contentType: 'application/json',
    });
  }
}
