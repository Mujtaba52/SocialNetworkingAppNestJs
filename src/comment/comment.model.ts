import mongoose from 'mongoose';

enum activitytype {
  COMMENT = 'comment',
  REPLY = 'reply',
}
export const commentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  activitytype: {
    type: activitytype,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'parentType',
  },
  parentType: {
    type: String,
    required: true,
    enum: ['comment', 'post'],
  },
});
