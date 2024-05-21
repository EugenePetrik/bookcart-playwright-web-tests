export interface IRegisterUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: 'Male' | 'Female';
}
