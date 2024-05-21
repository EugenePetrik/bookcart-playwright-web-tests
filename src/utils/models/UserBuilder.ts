import { faker } from '@faker-js/faker';
import { type IRegisterUser } from '../types/user';

class UserBuilder {
  private user: Partial<IRegisterUser> = {};

  setFirstName(firstName: string): this {
    this.user.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): this {
    this.user.lastName = lastName;
    return this;
  }

  setUserName(userName: string): this {
    this.user.userName = userName;
    return this;
  }

  setPassword(password: string): this {
    this.user.password = password;
    this.user.confirmPassword = password;
    return this;
  }

  setGender(gender: 'Male' | 'Female'): this {
    this.user.gender = gender;
    return this;
  }

  build(): IRegisterUser {
    return {
      firstName: this.user.firstName ?? faker.person.firstName(),
      lastName: this.user.lastName ?? faker.person.lastName(),
      userName: this.user.userName ?? `username_${Date.now().toString()}`,
      password: this.user.password ?? 'Qwerty123',
      confirmPassword: this.user.confirmPassword ?? 'Qwerty123',
      gender: this.user.gender ?? 'Male',
    };
  }
}

export default UserBuilder;
