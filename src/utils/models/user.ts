import { faker } from '@faker-js/faker';
import { type IRegisterUser } from '../types/user';
import users, { type IUsersConfig } from '../../test_data/users';

export function generateUser(): IRegisterUser {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userName: `username_${Date.now().toString()}`,
    password: 'Qwerty123',
    confirmPassword: 'Qwerty123',
    gender: 'Male',
  };
}

export function getUser(user: keyof IUsersConfig): [string, string] {
  const { username, password } = users[user];
  return [username, password];
}
