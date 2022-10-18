import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { FollowingModule } from './following/following.module';
import { authmiddleware } from './middleware/auth.middleware';
import { UserController } from './user/user.controller';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authmiddleware).forRoutes(UserController);
  }
}