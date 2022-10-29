import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ifollowing } from 'src/following/following.model';
import { IUser } from './user.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<IUser>,
    @InjectModel('following')
    private readonly followingModel: Model<Ifollowing>,
  ) {}
  async signup(name: string, email: string, password: string) {
    const user = new this.userModel({
      name,
      email,
      password,
    });
    const newUser = await user.save();
    return newUser;
  }
  async getUsers(page: number, limit: number) {
    const users = await this.userModel
      .find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    return users as IUser[];
  }
  async getUser(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user as IUser;
  }
  async followUser(id: string) {
    const user = new this.followingModel({
      followee: id,
      follower: '634a00f00bafcd3fe87a7b54',
    });
    await user.save();
    return user;
  }
  async unfollowUser(id: string) {
    const user = await this.followingModel.findOneAndDelete({
      followee: id,
      follower: '634a00f00bafcd3fe87a7b54',
    });
    return user;
  }
  async updateUser(id: string, body: JSON) {
    const user = await this.userModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
    return user as IUser;
  }
  async deleteUser(id: string) {
    return (await this.userModel.findByIdAndDelete(id)) as IUser;
  }
}
