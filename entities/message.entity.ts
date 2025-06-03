import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  room: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  timestamp: Date;
} 