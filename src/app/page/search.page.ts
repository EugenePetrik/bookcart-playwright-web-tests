import { expect } from '@playwright/test';
import { AppPage } from '../abstract.classes';
import baseConfig from '../../config/baseConfig';
import { step } from '../../utils/reporters/steps';

export class SearchPage extends AppPage {
  public readonly pagePath = '/';

  private readonly bookTitle = this.page.locator('.card-title');

  private readonly bookPrice = this.page.locator('mat-card-content p');

  private readonly addToCartButton = this.page.getByRole('button', {
    name: 'Add to Cart',
  });

  private readonly toast = this.page.locator('simple-snack-bar');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.bookTitle).toBeVisible(),
      await expect(this.bookPrice).toBeVisible(),
      await expect(this.addToCartButton).toBeVisible(),
    ]);
  }

  @step()
  async openBookDetails(): Promise<void> {
    await this.bookTitle.click();
  }

  @step()
  async addBookToCart(name: string): Promise<void> {
    await expect(this.bookTitle).toHaveText(name, { ignoreCase: true });

    const responsePromise = this.page.waitForResponse(
      `${baseConfig.WEB_URL}/api/shoppingcart/addToCart/**`,
    );
    await this.addToCartButton.click();
    await responsePromise;

    await expect(this.toast).toBeVisible({ timeout: 3_000 });
    await expect(this.toast).toHaveText('One Item added to cart');
    await expect(this.toast).not.toBeVisible({ timeout: 3_000 });
  }
}
