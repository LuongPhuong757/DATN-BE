import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer';
import { Product } from './product.entity';
import { StatusCart } from 'src/cart/cart.constants';
@Entity('carts')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column({name: 'user_id' })
  @ApiProperty()
  userId: number

  @Column({name: 'product_id' })
  @ApiProperty()
  productId: number

  @Column({default: 1})
  @ApiProperty()
  amount: number

  @Column({default: 1})
  @ApiProperty()
  status: StatusCart

  @CreateDateColumn({ name: 'created_at', nullable: true })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  @ApiProperty()
  updatedAt: Date

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product?: Product;
}
