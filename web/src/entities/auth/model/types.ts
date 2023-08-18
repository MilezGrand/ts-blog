export interface IUser {
  id: number,
  fullName: string,
  email: string,
  avatarUrl: string | null,
  createdAt: string,
  updatedAt: string,
  token: string,
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
}