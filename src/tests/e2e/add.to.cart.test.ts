import { loggedInAsNewUserFixture, loggedUserFixture } from '../../fixtures/login';

loggedInAsNewUserFixture(
  'new user can add a book to the shopping cart',
  { tag: '@ui' },
  async ({ app, user }) => {
    await app.homePage.header.selectBook('Roomies');
    await app.searchPage.addBookToCart('Roomies');

    await app.homePage.header.expectCartValueUpdated();
  },
);

loggedUserFixture(
  'existing user can add a book to the shopping cart',
  { tag: '@ui' },
  async ({ app, defaultUser }) => {
    await app.homePage.header.selectBook('The Simple Wild');
    await app.searchPage.addBookToCart('The Simple Wild');

    await app.homePage.header.expectCartValueUpdated();
  },
);
