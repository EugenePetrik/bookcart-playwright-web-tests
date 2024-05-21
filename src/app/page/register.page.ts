import { expect, test } from '@playwright/test';
import baseConfig from '../../config/baseConfig';
import { AppPage } from '../abstract.classes';
import { type IRegisterUser } from '../../utils/types/user';
import { step } from '../../utils/reporters/steps';

export class RegisterPage extends AppPage {
  public readonly pagePath = '/register';

  private readonly firstNameInput = this.page.getByPlaceholder('First name');

  private readonly lastNameInput = this.page.getByPlaceholder('Last name');

  private readonly userNameInput = this.page.getByPlaceholder('User name');

  private readonly passwordInput = this.page.locator('[formcontrolname="password"]');

  private readonly confirmPasswordInput = this.page.locator(
    '[formcontrolname="confirmPassword"]',
  );

  private readonly maleRadio = this.page.locator('input[value="Male"]');

  private readonly femaleRadio = this.page.locator('input[value="Female"]');

  private readonly registerButton = this.page.getByRole('button', { name: 'Register' });

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.firstNameInput).toBeVisible(),
      await expect(this.lastNameInput).toBeVisible(),
      await expect(this.userNameInput).toBeVisible(),
      await expect(this.passwordInput).toBeVisible(),
      await expect(this.confirmPasswordInput).toBeVisible(),
      await expect(this.maleRadio).toBeVisible(),
      await expect(this.femaleRadio).toBeVisible(),
      await expect(this.registerButton).toBeVisible(),
    ]);
  }

  @step()
  async registerUser(user: IRegisterUser): Promise<void> {
    const { firstName, lastName, username, password, confirmPassword, gender } = user;

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    await this.enterUsername(username);

    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);

    if (gender === 'Male') {
      await this.maleRadio.click();
      await expect(this.maleRadio).toBeChecked();
    } else {
      await this.femaleRadio.click();
      await expect(this.femaleRadio).toBeChecked();
    }

    await this.registerButton.click();

    await test.info().attach('Register user data', {
      body: JSON.stringify(user, null, 4),
      contentType: 'application/json',
    });
  }

  @step()
  private async enterUsername(text: string): Promise<void> {
    await this.userNameInput.fill(text);

    const [response] = await Promise.all([
      this.page.waitForResponse(res => {
        return (
          res.status() === 200 &&
          res.url() === `${baseConfig.WEB_URL}/api/user/validateUserName/${text}`
        );
      }),
    ]);

    await response.finished();
  }
}
