import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { IUser } from 'src/user/user.model';
@Injectable()
export class authmiddleware implements NestMiddleware {
  constructor(@InjectModel('user') private readonly userModel: Model<IUser>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization').replace('Bearer', '');
    const decoded = jwt.verify(token, 'JwtSecretKey');
    const user = await this.userModel.findById(decoded);
    console.log(user);

    next();
  }
}
