import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
@Controller('posts')
export class PostControllers {
  constructor(private postService: PostService) {}
  @Get('')
  getPost() {
    return this.postService.getPosts();
  }
  @Post('')
  async createPost(@Body('description') description: string) {
    const post = await this.postService.createPosts(description);
    return post;
  }
}
