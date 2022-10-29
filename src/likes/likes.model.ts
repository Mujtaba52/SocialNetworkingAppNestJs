import mongoose from 'mongoose';

enum activityType {
  COMMENT = 'comment',
  POST = 'post',
}

export interface Ilikes extends mongoose.Document {
  activity: mongoose.Schema.Types.ObjectId;
  likedBy: mongoose.Schema.Types.ObjectId;
  activityType: activityType;
}

export const likesSchema = new mongoose.Schema({
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'activityType',
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  activityType: {
    type: String,
    required: true,
    enum: ['comment', 'post'],
  },
});
