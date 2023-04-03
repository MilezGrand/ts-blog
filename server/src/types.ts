export type User = {
    id: number;
    fullname: string;
    email: string;
    passwordHash: string;
    avatarUrl?: string;
};

export type Post = {
  id: number;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: number;
  imageUrl?: string;
}