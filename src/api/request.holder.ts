import type { APIRequestContext } from '@playwright/test';
import baseConfig from '../config/baseConfig';

export abstract class RequestHolder {
  protected readonly apiURL = baseConfig.API_URL;

  constructor(protected request: APIRequestContext) {}
}
