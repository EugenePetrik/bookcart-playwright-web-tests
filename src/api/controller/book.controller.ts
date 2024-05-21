import { RequestHolder } from '../request.holder';
import { step } from '../../utils/reporters/steps';
import { IBookResponse } from '../../utils/types/book';

export class BookController extends RequestHolder {
  @step()
  async getBooks(): Promise<IBookResponse[]> {
    const response = await this.request.get(`${this.apiURL}/book`);
    return response.json() as Promise<IBookResponse[]>;
  }
}
