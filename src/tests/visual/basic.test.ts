import { baseFixture as test } from '../../fixtures';

test.beforeEach(async ({ app }) => {
  await app.homePage.open();
});

test('Verify the full page', { tag: ['@visual'] }, async ({ app }) => {
  await app.homePage.expectToHaveScreenshot('full_home_page.png', { fullPage: true });
});

test('Verify the visible viewport on the page', { tag: ['@visual'] }, async ({ app }) => {
  await app.homePage.expectToHaveScreenshot('viewport_home_page.png');
});

test('Verify specific element on the page', { tag: ['@visual'] }, async ({ app }) => {
  await app.homePage.expectToMatchSnapshot(
    app.homePage.getBookList,
    'book_list_element_home_page.png',
  );
});
