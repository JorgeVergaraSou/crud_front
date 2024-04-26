interface Post {
    idPost: number;
    typePost: string;
    title: string;
    content: string;
    postDate: Date;
    isActive: number;
    softDeleteDate: Date;
    userIdFk: number;
    pets: Pet[];
}