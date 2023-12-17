import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Patch, Res, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from 'src/dto/create-post.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }
    @Post()
    async createPost(@Req() req: any, @Res() response, @Body() createPostDto: CreatePostDto) {
        try {
            const postBy=req.user;
            const newPost = await this.postService.createPost(createPostDto,postBy);
            return response.status(HttpStatus.CREATED).json({
                success: true,
                message: "Post has been created",
                post: newPost
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request'
            });
        }
    }
    @Get()
    async getPosts(@Res() response,) {
        try {
            const posts = await this.postService.getPosts();
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Posts has been found successfully.',
                posts,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request'
            });
        }
    }
    @Get("/myposts")
    async getMyPosts(@Req() req: any,@Res() response,) {
        try {
            const posts = await this.postService.getMyPosts(req.user);
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Posts has been found successfully.',
                posts,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request'
            });
        }
    }
    @Patch(":id")
    async updatePost(@Req() req: any,@Res() response, @Param("id") postId, @Body() updatePostDto: UpdatePostDto) {
        const updatedPost = await this.postService.updatePost(postId, updatePostDto,req.user)
        if (updatedPost) {
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Posts has been updated successfully.',
                updatedPost,
            });
        } else {
            return response.status(HttpStatus.OK).json({
                success: false,
                message: "Posts couldn't found successfully.",
            });
        }
    }
    @Delete(":id")
    async deletePost(@Req() req: any,@Res() response, @Param("id") postId,) {
        const deletedPost = await this.postService.deletePost(postId,req.user)
        if (deletedPost?.deletedCount>0) {
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Posts has been deleted successfully.',
                deletedPost,
            });
        } else {
            return response.status(HttpStatus.OK).json({
                success: false,
                message: "Posts couldn't deleted successfully.",
            });
        }
    }
    @Get(":id")
    async getPost(@Res() response, @Param("id") postId,) {
        const post = await this.postService.getPost(postId)
        if (post) {
            return response.status(HttpStatus.OK).json({
                success: true,
                message: 'Posts has been found successfully.',
                post,
            });
        } else {
            return response.status(HttpStatus.OK).json({
                success: false,
                message: "Posts couldn't be found successfully.",
            });
        }
    }

}
