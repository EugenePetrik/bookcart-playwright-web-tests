import { type Category } from '../../app/component/categories.component';
import { baseFixture as test, loggedUserFixture } from '../../fixtures';
import { getUser } from '../../utils/getUser';

test(
  'unauthorized user should be able to filter books by category',
  { tag: '@ui' },
  async ({ app }) => {
    await app.homePage.open();

    const bookCategory: Category = 'Mystery';
    await app.homePage.categories.select(bookCategory);

    const allBooks = await app.api.book.getBooks();
    const filteredBooks = allBooks
      .filter(({ category }) => category === bookCategory)
      .map(({ title }) => title);

    await app.homePage.expectBooksFiltered(filteredBooks);
  },
);

loggedUserFixture.use({
  defaultUser: {
    username: getUser('lead_user').username,
    password: getUser('lead_user').password,
  },
});

loggedUserFixture(
  'authorized user should be able to filter books by category',
  { tag: '@ui' },
  async ({ app }) => {
    const bookCategory: Category = 'Biography';
    await app.homePage.categories.select(bookCategory);

    const allBooks = await app.api.book.getBooks();
    const filteredBooks = allBooks
      .filter(({ category }) => category === bookCategory)
      .map(({ title }) => title);

    await app.homePage.expectBooksFiltered(filteredBooks);
  },
);
