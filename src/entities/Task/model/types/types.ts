import { ImageMeta } from "shared/api/cloudinary";

export interface Task {
    boardId: string,
    columnId: string,
    title: string,
    description: string,
    order: number,
    createdAt: string,
    completed?: boolean;
    assets?: ImageMeta[]
}