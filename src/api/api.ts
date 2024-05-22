import { APIRequestContext } from '@playwright/test';
import { LoginController, UserController, BookController } from './controller';

export class API {
  public login: LoginController;

  public user: UserController;

  public book: BookController;

  constructor(request: APIRequestContext) {
    this.login = new LoginController(request);
    this.user = new UserController(request);
    this.book = new BookController(request);
  }

  // To update the request context across all controllers
  public updateRequestContext(request: APIRequestContext): void {
    this.login.request = request;
    this.user.request = request;
    this.book.request = request;
  }
}
