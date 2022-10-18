import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './post.model';
import { PostControllers } from './post.controller';
import { PostService } from './post.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'post', schema: postSchema }])],
  controllers: [PostControllers],
  providers: [PostService],
})
export class PostModule {}
