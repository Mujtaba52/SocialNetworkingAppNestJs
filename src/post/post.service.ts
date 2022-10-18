import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IPost } from './post.model';
import { Model } from 'mongoose';
@Injectable()
export class PostService {
  constructor(@InjectModel('post') private readonly postModel: Model<IPost>) {}
  async createPosts(description: string) {
    const post = new this.postModel({ description });
    await post.save();
    return post;
  }
  async getPosts() {
    const posts = await this.postModel.find({});
    return posts;
  }
}
