import { Document } from 'mongoose';

export interface IPost extends Document {
    readonly title: string;

    readonly description: string;

    readonly postBy: string;
}
export interface CreatePost {

    readonly post?: IPost;
}
export interface GetPosts {

    readonly posts?: IPost[];
}