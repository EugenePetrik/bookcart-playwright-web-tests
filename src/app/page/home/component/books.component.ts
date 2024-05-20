import { expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { Book } from './book.component';

export class Books extends Component {
  private readonly booksLocator = this.page.locator('app-book-card');

  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.booksLocator).not.toHaveCount(0),
      await new Book(this.booksLocator.first()).expectLoaded(),
    ]);
  }

  async getBooks(title: string): Promise<Book[]> {
    await this.expectLoaded();
    const books = await this.booksLocator.all();
    const filtered = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const book of books) {
      if ((await new Book(book).title()) === title) {
        filtered.push(book);
      }
    }

    return filtered.map(book => new Book(book));
  }

  async getBooksDetails(): Promise<Awaited<ReturnType<Book['details']>>[]> {
    await this.expectLoaded();
    const books = await this.booksLocator.all();
    const details = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const book of books) {
      details.push(await new Book(book).details());
    }

    return details;
  }
}
