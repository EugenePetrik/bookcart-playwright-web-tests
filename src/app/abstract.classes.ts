import { type Locator, expect, type Page } from '@playwright/test';
import { step } from '../utils/reporters/steps';

export abstract class PageHolder {
  constructor(protected page: Page) {}
}

export abstract class Component extends PageHolder {
  abstract expectLoaded(message?: string): Promise<void>;

  async isLoaded(): Promise<boolean> {
    try {
      await this.expectLoaded();
      return true;
    } catch {
      return false;
    }
  }
}

export abstract class AppPage extends Component {
  public abstract pagePath: string;

  @step()
  async open(path?: string): Promise<void> {
    await this.page.goto(path ?? this.pagePath);
    await this.expectLoaded();
  }

  @step()
  async expectToHaveURL(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  @step()
  async expectToHaveTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  @step()
  async expectToHaveScreenshot(
    fileName: string,
    options: { fullPage?: boolean; maxDiffPixels?: number; mask?: Locator[] } = {},
  ): Promise<void> {
    const { fullPage = false, maxDiffPixels = 0.1, mask = [] } = options;

    await expect(this.page).toHaveScreenshot(fileName, {
      fullPage,
      maxDiffPixels,
      mask,
    });
  }

  @step()
  async expectToMatchSnapshot(
    element: Locator,
    fileName: string,
    options: { maxDiffPixels?: number } = {},
  ): Promise<void> {
    const { maxDiffPixels = 0.1 } = options;

    await expect(element).toHaveScreenshot(fileName, {
      maxDiffPixels,
    });
  }
}
