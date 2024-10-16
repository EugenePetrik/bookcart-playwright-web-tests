import { APIRequestContext } from '@playwright/test';
import { LoginController, UserController, BookController } from './controller';

export class API {
  public login: LoginController = new LoginController(this.request);

  public user: UserController = new UserController(this.request);

  public book: BookController = new BookController(this.request);

  constructor(public request: APIRequestContext) {}

  // To update the request context across all controllers
  public updateRequestContext(request: APIRequestContext): void {
    this.login.request = request;
    this.user.request = request;
    this.book.request = request;
  }
}
