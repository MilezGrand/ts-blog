export interface IUser {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  token: string;
}
