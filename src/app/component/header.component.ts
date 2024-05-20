import { expect } from '@playwright/test';
import { Component } from '../abstract.classes';
import { step } from '../../utils/reporters/steps';

export class Header extends Component {
  private readonly searchInput = this.page.getByPlaceholder('Search books or authors');

  private readonly searchOption = this.page.locator(
    'mat-option .mdc-list-item__primary-text',
  );

  private readonly cartButton = this.page.locator(
    '[ng-reflect-router-link="/shopping-cart"]',
  );

  private readonly cartValue = this.page.locator('[id^=mat-badge-content]').last();

  private readonly userMenu = this.page.locator('mat-toolbar .mdc-button__label').nth(1);

  private readonly loginLink = this.page
    .locator('mat-toolbar-row')
    .getByRole('button', { name: 'Login' });

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.searchInput).toBeVisible(),
      await expect(this.cartButton).toBeVisible(),
    ]);
  }

  @step()
  async selectBook(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchOption.getByText(name).click();
    await expect(this.page).toHaveURL(/\/search\?item=/);
  }

  @step()
  async clickOnCart(): Promise<void> {
    await this.cartButton.click();
  }

  @step()
  async expectCartValueUpdated(): Promise<void> {
    const badgeCount = await this.cartValue.innerText();
    expect(Number(badgeCount)).toBeGreaterThan(0);
  }

  @step()
  async clickOnUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  @step()
  async expectLoginSuccess(username: string): Promise<void> {
    await expect(this.userMenu).toHaveText(username);
  }

  @step()
  async clickOnLogInLink(): Promise<void> {
    await this.loginLink.click();
  }
}
