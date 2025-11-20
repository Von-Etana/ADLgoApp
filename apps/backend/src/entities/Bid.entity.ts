import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Order } from './Order.entity';
import { User } from './User.entity';

export enum BidStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

@Entity()
export class Bid {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: BidStatus,
        default: BidStatus.PENDING,
    })
    status: BidStatus;

    @ManyToOne(() => Order, (order) => order.bids)
    order: Order;

    @ManyToOne(() => User, (user) => user.id)
    driver: User;

    @CreateDateColumn()
    createdAt: Date;
}
