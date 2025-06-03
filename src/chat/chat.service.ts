import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async saveMessage(userId: string, room: string, content: string): Promise<Message> {
    const message = this.messageRepository.create({
      userId,
      room,
      content,
      timestamp: new Date(),
    });
    return this.messageRepository.save(message);
  }

  async getRoomMessages(room: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: { room },
      order: { timestamp: 'ASC' },
    });
  }
} 