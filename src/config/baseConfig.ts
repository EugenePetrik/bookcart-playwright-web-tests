import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({
  path: join(process.cwd(), `.env.${process.env.ENV}`),
});

interface IBaseConfig {
  WEB_URL: string;
  API_URL: string;
}

const baseConfig = {} as IBaseConfig;

baseConfig.WEB_URL = process.env.WEB_URL || 'https://bookcart.azurewebsites.net';
baseConfig.API_URL = process.env.API_URL || 'https://bookcart.azurewebsites.net/api';

export default baseConfig;
