// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { StudentSchema } from './schema/student.schema';
import { UserSchema } from './schema/user.schema';
import { StudentService } from './student/student.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostSchema } from './schema/post.schema';
import { JwtMiddleware } from './jwt.middleware';
import { LocationService } from './location/location.service';
import { LocationController } from './location/location.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://harisbakhabarpk:7GJ9p6xebjgQgtjE@cluster0.ybov0y1.mongodb.net/',
      { dbName: 'typescriptlearn' }),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }, { name: 'User', schema: UserSchema }, { name: 'Post', schema: PostSchema }]),
    
  ],
  controllers: [AppController, StudentController, UserController, PostController, LocationController],
  providers: [AppService, StudentService, UserService, PostService, LocationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(PostController);
  }
}