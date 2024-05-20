import { expect } from '@playwright/test';
import { AppPage } from '../abstract.classes';
import { step } from '../../utils/reporters/steps';

export class BookDetails extends AppPage {
  public readonly pagePath = '/';

  private readonly root = this.page.locator('mat-card-content');

  public readonly title = this.root.locator('td').nth(1);

  public readonly author = this.root.locator('td').nth(3);

  public readonly category = this.root.locator('td').nth(5);

  public readonly price = this.root.locator('td').nth(7);

  public readonly addToCartButton = this.root.getByRole('button', {
    name: 'Add to Cart',
  });

  public readonly addToWishlistButton = this.root.getByRole('button', {
    name: 'Add to Wishlist',
  });

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.title).toBeVisible(),
      await expect(this.author).toBeVisible(),
      await expect(this.category).toBeVisible(),
      await expect(this.price).toBeVisible(),
      await expect(this.addToCartButton).toBeVisible(),
    ]);
  }

  @step()
  async clickOnAddToCartButton(): Promise<void> {
    await this.addToCartButton.click();
  }
}
