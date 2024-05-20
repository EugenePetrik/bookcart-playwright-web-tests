import { expect, type Page } from '@playwright/test';

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

  async open(path?: string): Promise<void> {
    await this.page.goto(path ?? this.pagePath);
    await this.expectLoaded();
  }

  async expectURL(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  async expectTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }
}
