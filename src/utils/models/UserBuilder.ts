import { faker } from '@faker-js/faker';
import { type IRegisterUser } from '../types/user';

type Gender = 'Male' | 'Female';

export class UserBuilder {
  private user: Partial<IRegisterUser> = {};

  setFirstName(value: string): this {
    this.user.firstName = value;
    return this;
  }

  setLastName(value: string): this {
    this.user.lastName = value;
    return this;
  }

  setUserName(value: string): this {
    this.user.username = value;
    return this;
  }

  setPassword(value: string): this {
    this.user.password = value;
    return this;
  }

  setConfirmPassword(value: string): this {
    this.user.confirmPassword = value;
    return this;
  }

  setGender(value: Gender): this {
    this.user.gender = value;
    return this;
  }

  build(): IRegisterUser {
    return {
      firstName: this.user.firstName ?? faker.person.firstName(),
      lastName: this.user.lastName ?? faker.person.lastName(),
      username: this.user.username ?? `user_${faker.number.int(10_000)}`,
      password: this.user.password ?? 'Qwerty123',
      confirmPassword: this.user.confirmPassword ?? 'Qwerty123',
      gender: this.user.gender ?? 'Female',
    };
  }
}
