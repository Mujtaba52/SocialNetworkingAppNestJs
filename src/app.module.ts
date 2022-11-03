import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { FollowingModule } from './following/following.module';
import { LikesModule } from './likes/likes.module';
import { CommentModule } from './comment/comment.module';
import { MessagesModule } from './messages/messages.module';
import * as dotenv from 'dotenv';
dotenv.config();
// mongodb+srv://Mujhassan786:<password>@mycluster.fvgee7z.mongodb.net/?retryWrites=true&w=majority
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PostModule,
    AuthModule,
    FollowingModule,
    LikesModule,
    CommentModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
