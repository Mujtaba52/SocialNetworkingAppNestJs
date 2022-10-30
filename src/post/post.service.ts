import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IPost } from './post.model';
import mongoose, { Model, Types } from 'mongoose';
import { Ilikes } from 'src/likes/likes.model';
import { IComment } from 'src/comment/comment.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('post') private readonly postModel: Model<IPost>,
    @InjectModel('like') private readonly likeModel: Model<Ilikes>,
    @InjectModel('comment') private readonly commentModel: Model<IComment>,
  ) {}

  async createPost(description: string, id: string) {
    const post = new this.postModel({
      description,
      createdBy: new Types.ObjectId(id),
    });
    await post.save();
    return post;
  }

  async getPosts() {
    const posts = await this.postModel.find({}).populate('parent');
    return posts;
  }

  async deletePost(id: string) {
    const deletedPost = await this.postModel.findByIdAndDelete(id, {
      new: true,
    });
    return deletedPost;
  }

  async editPost(id: string, Postbody: JSON) {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, Postbody, {
      new: true,
    });
    return updatedPost;
  }
  async sharePost(postToBeShared: string, userId: string, description: string) {
    const sharedPost = new this.postModel({
      description,
      parent: new Types.ObjectId(postToBeShared),
      createdBy: new Types.ObjectId(userId),
    });
    sharedPost.save();
    return sharedPost;
  }
  async likePost(userId: string, activityId: string, activityType: string) {
    const likedPostEntry = await this.likeModel.findOne({
      activityId,
      likedBy: new Types.ObjectId(userId),
      activityType,
    });
    if (likedPostEntry) {
      return `${activityType} already liked`;
    }
    const likedPost = new this.likeModel({
      activityId,
      likedBy: userId,
      activityType,
    });
    likedPost.save();
    return likedPost;
  }

  async unlikePost(userId: string, activityId: string, activityType: string) {
    const likedPostEntry = await this.likeModel.findOneAndDelete({
      activityId,
      likedBy: new Types.ObjectId(userId),
      activityType,
    });
    if (likedPostEntry) {
      return `${activityType} unliked`;
    }
    return `${activityType} not liked`;
  }

  async leaveACommentOrReply(
    description: string,
    activitytype: string,
    userId: string,
    postOrCommentId: string,
    parentType: string,
  ) {
    const comment = new this.commentModel({
      description,
      activitytype,
      postedBy: new mongoose.Types.ObjectId(userId),
      parentId: new mongoose.Types.ObjectId(postOrCommentId),
      parentType,
    });
    comment.save();
    return comment;
  }
}
