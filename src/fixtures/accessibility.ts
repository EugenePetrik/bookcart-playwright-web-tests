import AxeBuilder from '@axe-core/playwright';
import { baseFixture } from './base';

export type TagsOption = {
  tags: string[];
};

type AxeFixture = {
  accessibility: () => AxeBuilder;
};

export const accessibilityFixture = baseFixture.extend<AxeFixture & TagsOption>({
  tags: [['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'], { option: true }],

  accessibility: async ({ page, tags }, use) => {
    const accessibilityBuilder = () => new AxeBuilder({ page }).withTags(tags);
    await use(accessibilityBuilder);
  },
});
