export interface AppUser {
    id: string;
    fullName: string;
    profilePictureUrl?: string | null;
}

export interface Comment {
    id: string;
    content: string;
    appUser: AppUser;
}

export interface Post {
    id: string;
    content: string;
    imageUrl?: string;
    isPrivate: boolean;
    createAt: Date | string;
    appUser: AppUser;
    likeCount: number;
    commentCount: number;
    favoriteCount: number;
    reportCount: number;
    likedByUserIds: string[];
    favoritedByUserIds: string[];
    reportedByUserIds: string[];
    comments: Comment[];
}
