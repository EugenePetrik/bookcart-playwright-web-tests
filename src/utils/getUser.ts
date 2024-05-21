import users, { type IUser, type IUsersConfig } from '../test_data/users';

export function getUser(user: keyof IUsersConfig): IUser {
  const { username, password } = users[user];
  return { username, password };
}
