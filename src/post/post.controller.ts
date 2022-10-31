import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { activityType } from 'src/likes/likes.model';
import { actiontype } from 'src/comment/comment.model';
import { ApiTags } from '@nestjs/swagger';
import { createPostDto } from './dto/create-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostControllers {
  constructor(private postService: PostService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  getPost() {
    return this.postService.getPosts();
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() body: createPostDto, @Request() req) {
    const post = await this.postService.createPost(body, req.user._id);
    return post;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editPost(@Request() req, @Param('id') id: string) {
    const updatedPost = await this.postService.editPost(id, req.body);
    return updatedPost;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Request() req, @Param('id') id: string) {
    const updatedPost = await this.postService.deletePost(id);
    return updatedPost;
  }

  @Post(':id/share')
  @UseGuards(JwtAuthGuard)
  async sharePost(@Request() req, @Param('id') id: string) {
    const updatedPost = await this.postService.sharePost(
      id,
      req.user._id,
      req.body.description || '',
    );
    return updatedPost;
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async likePost(@Request() req, @Param('id') id: string) {
    const updatedPost = await this.postService.likePost(
      req.user._id,
      id,
      activityType.POST,
    );
    return updatedPost;
  }

  @Post(':id/unlike')
  @UseGuards(JwtAuthGuard)
  async unlikePost(@Request() req, @Param('id') id: string) {
    const updatedPost = await this.postService.unlikePost(
      req.user._id,
      id,
      activityType.POST,
    );
    return updatedPost;
  }

  @Post(':id/comment')
  @UseGuards(JwtAuthGuard)
  async commentOnPost(
    @Request() req,
    @Param('id') id: string,
    @Body('description') description: string,
  ) {
    const comment = await this.postService.leaveACommentOrReply(
      description,
      actiontype.REPLY,
      req.user._id,
      id,
      activityType.POST,
    );
    return comment;
  }
}
