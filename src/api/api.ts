import { LoginController, UserController, BookController } from './controller';
import { RequestHolder } from './request.holder';

export class API extends RequestHolder {
  public readonly login = new LoginController(this.request);

  public readonly user = new UserController(this.request);

  public readonly book = new BookController(this.request);
}
