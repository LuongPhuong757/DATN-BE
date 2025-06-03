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

  async saveMessage(userId: number, senderId: number, content: string, isAdmin: boolean = false): Promise<Message> {
    const message = this.messageRepository.create({
      userId,
      senderId,
      content,
      isAdmin,
    });
    return this.messageRepository.save(message);
  }

  async getUserMessages(userId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { userId },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }

  async getAdminMessages(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['user', 'sender'],
      order: { createdAt: 'DESC' },
    });
  }

  async getUnreadMessageCount(userId: number): Promise<number> {
    return this.messageRepository.count({
      where: { userId, isAdmin: true },
    });
  }
} 