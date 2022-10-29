import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesController } from './likes.controller';
import { likesSchema } from './likes.model';
import { LikesService } from './likes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'likes', schema: likesSchema }]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
