import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.generateWebToken = async function () {
  const token = jwt.sign({ id: this._id.toString() }, 'JwtSecretKey');
  this.tokens.unshift({ token });
  this.save();
  return token;
};
export interface IUser extends mongoose.Document {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  generateWebToken(): string;
}
