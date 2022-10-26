import { Module } from '@nestjs/common';
import { UserSchema } from 'src/user/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { authmiddleware } from './auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [authmiddleware],
})
export class AuthMiddlewareModule {}
