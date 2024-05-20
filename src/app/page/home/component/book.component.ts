import { type Locator, expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';

export class Book extends Component {
  private readonly titleLocator = this.root.locator('.card-title');

  private readonly priceLocator = this.root.locator('mat-card-content p');

  private readonly addToCardLocator = this.root.getByRole('button', {
    name: 'Add to Cart',
  });

  constructor(private root: Locator) {
    super(root.page());
  }

  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.titleLocator).toBeVisible(),
      await expect(this.priceLocator).toBeVisible(),
      await expect(this.addToCardLocator).toBeVisible(),
    ]);
  }

  async title() {
    return this.titleLocator.innerText();
  }

  async price() {
    const price = await this.priceLocator.innerText();
    return parseFloat(price.replace(/[^\d+.]/g, ''));
  }

  async details() {
    return {
      name: await this.title(),
      price: await this.price(),
    };
  }

  async select() {
    await this.expectLoaded();
    await this.titleLocator.click();
  }

  async addToCart() {
    await this.expectLoaded();
    await this.addToCardLocator.click();
  }
}
