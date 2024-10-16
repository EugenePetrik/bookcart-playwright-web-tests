import { RequestHolder } from '../request.holder';
import { step } from '../../utils/reporters/steps';
import type { IRegisterUser } from '../../utils/types/user';

export class UserController extends RequestHolder {
  @step()
  async register(data: IRegisterUser): Promise<void> {
    await this.request.post(`${this.apiURL}/user/`, {
      data,
    });
  }
}
