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
// mongodb+srv://Mujhassan786:<password>@mycluster.fvgee7z.mongodb.net/?retryWrites=true&w=majority
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://Mujhassan786:connect4@mycluster.fvgee7z.mongodb.net/NestJS_SocialMediaApp?retryWrites=true&w=majority',
    ),
    PostModule,
    AuthModule,
    FollowingModule,
    LikesModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
