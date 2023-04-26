export interface IPost {
    id: number;
    title: string;
    text: string;
    tags: string[];
    viewsCount: number;
    user: {avatarUrl?: string, fullName?: string, email?: string, passwordHash?: string, id?: number};
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAddingPost {
    title: string;
    text: string;
    imageUrl: string;
    tags: string[];
}