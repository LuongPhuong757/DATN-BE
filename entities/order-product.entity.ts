import { ApiProperty } from '@nestjs/swagger'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer';
// import { Comment } from './comment.entity';
// import { Image } from './image.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';
@Entity('order_product')
export class OrderProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({ name: 'order_id' })
    @ApiProperty()
    orderId: number

    @Column({ name: 'product_id' })
    @ApiProperty()
    productId: number

    @Column()
    @ApiProperty()
    amount: number

    @Column()
    @ApiProperty()
    price: number

    @CreateDateColumn({ name: 'created_at', nullable: true })
    @ApiProperty()
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    @ApiProperty()
    updatedAt: Date

    @ManyToOne(() => Order, order => order.listProduct)
    @JoinColumn({ name: 'order_id' })
    order?: Order;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product?: Product;
}
