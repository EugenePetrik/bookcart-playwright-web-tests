import { accessibilityFixture as test, expect } from '../../fixtures';
import { attachAxeReport } from '../../utils/reporters/axe.reporter';

test(
  'Accessibility -> full page analyze',
  { tag: ['@accessibility'] },
  async ({ app, accessibility }, testInfo) => {
    await app.homePage.open();

    const axeResults = await accessibility().analyze();
    await attachAxeReport(axeResults, testInfo);
    expect(axeResults.violations).toEqual([]);
  },
);

test(
  'Accessibility -> specific element analyze',
  { tag: ['@accessibility'] },
  async ({ app, accessibility }, testInfo) => {
    await app.homePage.open();

    const axeResults = await accessibility().include('app-book-filter').analyze();
    await attachAxeReport(axeResults, testInfo);
    expect(axeResults.violations).toEqual([]);
  },
);

test(
  'Accessibility -> exclude element to analyze',
  { tag: ['@accessibility'] },
  async ({ app, accessibility }, testInfo) => {
    await app.homePage.open();

    const axeResults = await accessibility().exclude('app-book-filter').analyze();
    await attachAxeReport(axeResults, testInfo);
    expect(axeResults.violations).toEqual([]);
  },
);

test(
  'Accessibility -> disable rules to analyze',
  { tag: ['@accessibility'] },
  async ({ app, accessibility }, testInfo) => {
    await app.homePage.open();

    const axeResults = await accessibility()
      .disableRules(['button-name', 'image-alt', 'label'])
      .analyze();
    await attachAxeReport(axeResults, testInfo);
    expect(axeResults.violations).toEqual([]);
  },
);
