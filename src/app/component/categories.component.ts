import { expect } from '@playwright/test';
import { Component } from '../abstract.classes';
import { step } from '../../utils/reporters/steps';

type Category =
  | 'All Categories'
  | 'Biography'
  | 'Fiction'
  | 'Mystery'
  | 'Fantasy'
  | 'Romance';

export class Categories extends Component {
  private root = this.page.locator('mat-nav-list');

  private categories = this.root.locator('mat-list-item a');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.root).toBeVisible(),
      await expect(this.categories).not.toHaveCount(0),
    ]);
  }

  @step()
  async select(name: Category): Promise<void> {
    await this.categories.getByText(name).click();
  }

  @step()
  async expectCategories(names: string[]): Promise<void> {
    await expect(this.categories).toHaveText(names);
  }
}
