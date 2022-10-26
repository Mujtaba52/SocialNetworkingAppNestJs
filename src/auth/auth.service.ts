import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  async siginIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && user.password === password) {
      //   const token = await user.generateWebToken();
      return user;
    }
    return 'user not found';
  }

  async generateToken(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  signOut() {
    return '';
  }
}
