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

  async saveMessage(roomId: number, senderId: number, content: string, isAdmin: boolean = false): Promise<Message> {
    const message = this.messageRepository.create({
      roomId,
      senderId,
      content,
      isAdmin,
    });
    return this.messageRepository.save(message);
  }

  async getRoomMessages(roomId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { roomId },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }

  async getAdminMessages(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['room', 'sender'],
      order: { createdAt: 'DESC' },
    });
  }

  async getUnreadMessageCount(roomId: number): Promise<number> {
    return this.messageRepository.count({
      where: { roomId, isAdmin: true },
    });
  }
} 