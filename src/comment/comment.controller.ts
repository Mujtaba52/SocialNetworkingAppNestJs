import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { activityType } from 'src/likes/likes.model';
import { actiontype } from 'src/comment/comment.model';

import { PostService } from 'src/post/post.service';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private postService: PostService,
  ) {}

  @Post(':id/reply')
  @UseGuards(JwtAuthGuard)
  async replyOnComment(
    @Request() req,
    @Param('id') id: string,
    @Body('description') description: string,
  ) {
    const reply = await this.postService.leaveACommentOrReply(
      description,
      actiontype.REPLY,
      req.user._id,
      id,
      activityType.COMMENT,
    );
    return reply;
  }
}
