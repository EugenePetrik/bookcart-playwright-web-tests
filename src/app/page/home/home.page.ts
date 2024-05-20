import { expect } from '@playwright/test';
import { AppPage } from '../../abstract.classes';
import { Header } from '../../component/header.component';
import { Books } from './component/books.component';
import { type Book } from './component/book.component';

export class HomePage extends AppPage {
  public readonly pagePath = '/';

  public readonly header = new Header(this.page);

  private readonly books = new Books(this.page);

  private readonly bookList = this.page.locator('card-deck-container');

  async expectLoaded(): Promise<void> {
    await expect(this.bookList).toBeVisible();
  }

  async openBookDetails(title: string): Promise<void> {
    const matchedFirstResult: Book = (await this.books.getBooks(title))[0];
    await matchedFirstResult.select();
  }

  async addBookToCart(title: string): Promise<void> {
    const matchedFirstResult: Book = (await this.books.getBooks(title))[0];
    await matchedFirstResult.addToCart();
  }

  async getBooksDetails(): Promise<Awaited<ReturnType<Book['details']>>[]> {
    return this.books.getBooksDetails();
  }
}
