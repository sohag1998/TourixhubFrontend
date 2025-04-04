export interface AppUser {
    id: string;
    fullName: string;
    profilePictureUrl?: string | null;
}

export interface Comment {
    id: string;
    content: string;
    appUser: AppUser;
    createAt: Date;
}

export interface Message {
    sender: string;
    text: string;
    timestamp: string;
}

export interface Post {
    id: string;
    content: string;
    imageUrl?: string;
    isPrivate: boolean;
    createAt: Date;
    appUser: AppUser;
    likeCount: number;
    commentCount: number;
    favoriteCount: number;
    reportCount: number;
    likedByUserIds: string[];
    favoritedByUserIds: string[];
    reportedByUserIds: string[];
    comments: Comment[];
    images: string[];
}

export interface AddPostDto {
    Content: string | null;
    Images: File[] | null;
}