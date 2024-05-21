import { accessibilityFixture, expect } from '../../fixtures';
import { attachAxeReport } from '../../utils/reporters/axe.reporter';

accessibilityFixture(
  'Accessibility -> full page analyze',
  { tag: ['@accessibility'] },
  async ({ app, accessibility }, testInfo) => {
    await app.homePage.open();

    const axeResults = await accessibility().analyze();
    await attachAxeReport(axeResults, testInfo);
    expect(axeResults.violations).toEqual([]);
  },
);

accessibilityFixture(
  'Accessibility -> specific element analyze',
  { tag: ['@accessibility'] },
  async ({ app, accessibility }, testInfo) => {
    await app.homePage.open();

    const axeResults = await accessibility().include('app-book-filter').analyze();
    await attachAxeReport(axeResults, testInfo);
    expect(axeResults.violations).toEqual([]);
  },
);

accessibilityFixture(
  'Accessibility -> exclude element to analyze',
  { tag: ['@accessibility'] },
  async ({ app, accessibility }, testInfo) => {
    await app.homePage.open();

    const axeResults = await accessibility().exclude('app-book-filter').analyze();
    await attachAxeReport(axeResults, testInfo);
    expect(axeResults.violations).toEqual([]);
  },
);

accessibilityFixture(
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
