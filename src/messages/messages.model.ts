import mongoose from 'mongoose';

export const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export interface Imessage {
  sender: mongoose.Schema.Types.ObjectId;
  text: string;
}
