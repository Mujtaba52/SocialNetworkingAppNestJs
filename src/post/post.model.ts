import * as mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: null,
    ref: 'post',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

export interface IPost extends mongoose.Document {
  description: string;
  parent: mongoose.Types.ObjectId;
}
