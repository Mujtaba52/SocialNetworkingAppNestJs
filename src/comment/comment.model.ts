import mongoose from 'mongoose';

export enum actiontype {
  COMMENT = 'comment',
  REPLY = 'reply',
}
export interface IComment extends mongoose.Document {
  description: string;
  activitytype: actiontype;
  postedBy: mongoose.Schema.Types.ObjectId;
  parentId: mongoose.Schema.Types.ObjectId;
  parentType: ['comment', 'post'];
}

export const commentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  activitytype: {
    type: String,
    required: true,
    enum: actiontype,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'parentType',
  },
  parentType: {
    type: String,
    required: true,
    enum: ['comment', 'post'],
  },
});
