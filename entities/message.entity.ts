import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'room_id' })
  roomId: number;

  @Column({ name: 'sender_id' })
  senderId: number;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column('text')
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'room_id' })
  room: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;
} 