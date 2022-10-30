import * as mongoose from 'mongoose';

export const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: 'post',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  },
);

export interface IPost extends mongoose.Document {
  description: string;
  parent: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}
