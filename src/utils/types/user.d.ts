export interface IRegisterUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: 'Male' | 'Female';
}

export interface ILoginResponse {
  token: string;
  userDetails: {
    userId: string;
    username: string;
    userTypeId: string;
  };
}
