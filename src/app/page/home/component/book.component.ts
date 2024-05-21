import { type Locator, expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class Book extends Component {
  private readonly titleLocator = this.root.locator('.card-title');

  private readonly priceLocator = this.root.locator('mat-card-content p');

  private readonly addToCardLocator = this.root.getByRole('button', {
    name: 'Add to Cart',
  });

  private readonly addToWishListLocator = this.root.locator('app-addtowishlist');

  constructor(private root: Locator) {
    super(root.page());
  }

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.titleLocator).toBeVisible(),
      await expect(this.priceLocator).toBeVisible(),
      await expect(this.addToCardLocator).toBeVisible(),
    ]);
  }

  @step()
  async title() {
    return this.titleLocator.innerText();
  }

  @step()
  async price() {
    const price = await this.priceLocator.innerText();
    return parseFloat(price.replace(/[^\d+.]/g, ''));
  }

  @step()
  async details() {
    return {
      name: await this.title(),
      price: await this.price(),
    };
  }

  @step()
  async select() {
    await this.expectLoaded();
    await this.titleLocator.click();
  }

  @step()
  async addToCart() {
    await this.expectLoaded();
    await this.addToCardLocator.click();
  }

  @step()
  async addToWishList() {
    await this.expectLoaded();
    await this.addToWishListLocator.click();
  }
}
