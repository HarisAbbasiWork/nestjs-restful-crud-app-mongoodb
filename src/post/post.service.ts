import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePost, GetPosts, IPost } from 'src/interface/post.interface';
import { Model } from "mongoose";
import { CreatePostDto, UpdatePostDto } from 'src/dto/create-post.dto';
@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private postModel: Model<IPost>) { }
    async createPost(createPostDto: CreatePostDto, postBy: String): Promise<IPost> {
        console.log("createPostDto ", createPostDto)
        const { title, description } = createPostDto;
        const newPost = await new this.postModel({
            ...createPostDto,
            postBy
        }).save();
        console.log("newPost ", newPost)
        return newPost
    }
    async getMyPosts(userId: String): Promise<IPost[]> {
        console.log("userId ", userId)
        const posts = await this.postModel.find({ postBy: userId }).populate('postBy', '-password')
        console.log("newPost ", posts)
        return posts
    }
    async getPosts(): Promise<IPost[]> {
        const posts = await this.postModel.find({}).populate('postBy', '-password')
        console.log("newPost ", posts)
        return posts
    }
    async updatePost(postId: string, post: UpdatePostDto, userId: String): Promise<IPost> {
        const postInfo = await this.postModel.findById(postId);
        console.log("post.postBy ",postInfo.postBy)
        if (postInfo.postBy.toString() !== userId) {
            throw new UnauthorizedException('You can only update your own posts');
        }
        const updatedPost = await this.postModel.findOneAndUpdate({
            _id: postId
        }, {
            $set: post
        }, {
            new: true
        }).populate('postBy')
        console.log("updatedPost ", updatedPost)
        return updatedPost
    }
    async deletePost(postId: string, userId: String): Promise<any> {
        const post = await this.postModel.findById(postId);
        console.log("post.postBy ",post.postBy)
        if (post.postBy.toString() !== userId) {
            throw new UnauthorizedException('You can only delete your own posts');
        }
        const deletedPost = await this.postModel.deleteOne({
            _id: postId
        })
        console.log("deletedPost ", deletedPost)
        return deletedPost
    }
    async getPost(postId: string): Promise<any> {
        const post = await this.postModel.findOne({
            _id: postId
        }).populate('postBy', '-password')
        console.log("post ", post)
        return post
    }
}
