import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
@Schema()
export class Post {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    postBy: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);