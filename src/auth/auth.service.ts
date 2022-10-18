import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/user.model';
@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private readonly userModel: Model<IUser>) {}
  async siginIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user.password === password) {
      return user;
    }
    return 'Incorrect Password';
  }
  signOut() {
    return '';
  }
}
