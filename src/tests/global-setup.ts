import { rimraf } from 'rimraf';
import { join } from 'path';

async function globalSetup(): Promise<void> {
  await rimraf(join(process.cwd(), 'logs'));
  await rimraf(join(process.cwd(), 'playwright-report'));
  await rimraf(join(process.cwd(), 'test-results'));
  await rimraf(join(process.cwd(), 'lighthouse-html-report'));
}

export default globalSetup;
