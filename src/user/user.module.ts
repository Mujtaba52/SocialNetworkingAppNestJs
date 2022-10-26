import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { followingSchema } from 'src/following/following.model';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'following', schema: followingSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
