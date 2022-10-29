import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IPost } from './post.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel('post') private readonly postModel: Model<IPost>) {}

  async createPost(description: string, id: string) {
    const post = new this.postModel({
      description,
      createdBy: new Types.ObjectId(id),
    });
    await post.save();
    return post;
  }

  async getPosts() {
    const posts = await this.postModel.find({});
    return posts;
  }

  async deletePost(id: string) {
    const deletedPost = this.postModel.findByIdAndDelete(id, { new: true });
    return deletedPost;
  }

  async editPost(id: string, body: JSON) {
    const updatedPost = this.postModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedPost;
  }
  // async sharePost() {}
  // async likePost() {}
}
