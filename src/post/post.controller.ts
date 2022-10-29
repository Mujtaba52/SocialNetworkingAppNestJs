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
  async createPost(@Body('description') description: string, @Request() req) {
    const post = await this.postService.createPost(description, req.user._id);
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
}
