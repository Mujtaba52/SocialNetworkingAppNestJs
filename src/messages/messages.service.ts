import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Imessage } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('messages') private readonly messagesModel: Model<Imessage>,
  ) {}
  create(createMessageDto: CreateMessageDto) {
    const message = new this.messagesModel({ ...createMessageDto });
    message.save();
    return message;
  }

  findAll() {
    return { text: 'This action returns all messages' };
  }
}
