import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './post.model';
import { PostControllers } from './post.controller';
import { PostService } from './post.service';
import { likesSchema } from 'src/likes/likes.model';
import { commentSchema } from 'src/comment/comment.model';
import { followingSchema } from 'src/following/following.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'post', schema: postSchema }]),
    MongooseModule.forFeature([{ name: 'like', schema: likesSchema }]),
    MongooseModule.forFeature([{ name: 'comment', schema: commentSchema }]),
    MongooseModule.forFeature([{ name: 'following', schema: followingSchema }]),
  ],
  controllers: [PostControllers],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
