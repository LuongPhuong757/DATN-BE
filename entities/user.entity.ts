import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer';
// import { Comment } from './comment.entity';
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column({ default: '', length: 100, name: 'user_name' ,nullable: true})
  @ApiProperty()
  userName: string

  @Column({ default: '', length: 100, nullable: true })
  @ApiProperty()
  avatar: string

  @Column({nullable: true})
  @Exclude()
  password: string

  @Column({nullable: true})
  @ApiProperty()
  roles: string

  @Column({nullable: true})
  @ApiProperty()
  address: string

  @Unique('email', ['email'])
  @Column({ length: 200,nullable: true })
  @ApiProperty()
  email: string

  @Column({ length: 200, name: 'phone_number',nullable: true })
  @ApiProperty()
  phoneNumber: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  @ApiProperty()
  updatedAt: Date

//   @OneToMany(() => Comment, comment => comment.user)
//   comments: Comment[];
}
