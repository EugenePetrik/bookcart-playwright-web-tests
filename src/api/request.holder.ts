import { request as playwrightRequest, type APIRequestContext } from '@playwright/test';
import baseConfig from '../config/baseConfig';

export abstract class RequestHolder {
  protected readonly apiURL = baseConfig.API_URL;

  constructor(public request: APIRequestContext) {}

  protected async createAuthorizedContext(token: string): Promise<void> {
    this.request = await playwrightRequest.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
