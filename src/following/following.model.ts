import * as mongoose from 'mongoose';

export const followingSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  followee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export interface Ifollowing {
  follower: mongoose.Schema.Types.ObjectId;
  followee: mongoose.Schema.Types.ObjectId;
}
