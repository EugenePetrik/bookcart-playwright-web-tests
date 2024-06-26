import { type Locator, expect } from '@playwright/test';
import { AppPage } from '../../abstract.classes';
import { Header, Categories } from '../../component';
import { Books } from './component/books.component';
import { type Book } from './component/book.component';
import { step } from '../../../utils/reporters/steps';

export class HomePage extends AppPage {
  public readonly pagePath = '/';

  public readonly header = new Header(this.page);

  public readonly categories = new Categories(this.page);

  private readonly books = new Books(this.page);

  private readonly bookList = this.page.locator('.card-deck-container');

  get getBookList(): Locator {
    return this.bookList;
  }

  @step()
  async expectLoaded(): Promise<void> {
    await expect(this.bookList).toBeVisible();
    await this.categories.expectLoaded();
  }

  @step()
  async openBookDetails(title: string): Promise<void> {
    const matchedFirstResult: Book = (await this.books.getBooks(title))[0];
    await matchedFirstResult.select();
  }

  @step()
  async addBookToCart(title: string): Promise<void> {
    const matchedFirstResult: Book = (await this.books.getBooks(title))[0];
    await matchedFirstResult.addToCart();
  }

  @step()
  async addBookToWishList(title: string): Promise<void> {
    const matchedFirstResult: Book = (await this.books.getBooks(title))[0];
    await matchedFirstResult.addToWishList();
  }

  @step()
  async getBooksDetails(): Promise<Awaited<ReturnType<Book['details']>>[]> {
    return this.books.getBooksDetails();
  }

  @step()
  async expectBooksFiltered(expectedBooks: string[]): Promise<void> {
    const books = await this.books.getBooksDetails();
    const titles = books.map(({ name }) => name);
    expect(
      titles,
      `The actual list of filtered book titles - ${titles.join(', ')} does not match the expected list - ${expectedBooks.join(', ')}`,
    ).toEqual(expectedBooks);
  }
}
