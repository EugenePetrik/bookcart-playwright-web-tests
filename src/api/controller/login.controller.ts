import { RequestHolder } from '../request.holder';
import { step } from '../../utils/reporters/steps';
import type { ILoginResponse } from '../../utils/types/user';

export class LoginController extends RequestHolder {
  @step()
  async login(data: { username: string; password: string }): Promise<ILoginResponse> {
    const response = await this.request.post(`${this.apiURL}/login`, {
      data,
    });

    return response.json() as Promise<ILoginResponse>;
  }
}
