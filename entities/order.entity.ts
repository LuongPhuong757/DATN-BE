import { ApiProperty } from '@nestjs/swagger'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { OrderProduct } from './order-product.entity'
import { User } from './user.entity'
@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({ name: 'user_id' })
    @ApiProperty()
    userId: number

    @Column({nullable: true})
    @ApiProperty()
    status: string

    @Column({ name: 'shipping_status' , nullable: true})
    @ApiProperty()
    shippingStatus: string

    @Column({ name: 'total_money' })
    @ApiProperty()
    totalMoney: number

    @CreateDateColumn({ name: 'created_at', nullable: true })
    @ApiProperty()
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    @ApiProperty()
    updatedAt: Date

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    listProduct?: OrderProduct[];

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user?: User;
}
