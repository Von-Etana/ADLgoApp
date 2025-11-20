import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';
import { Bid } from './Bid.entity';

export enum OrderStatus {
    PENDING = 'pending', // Created, waiting for bids
    ACCEPTED = 'accepted', // Driver selected
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export enum OrderType {
    RIDE = 'ride',
    DELIVERY = 'delivery',
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    pickupLocation: string; // Could be JSON or stringified coordinates

    @Column()
    dropoffLocation: string;

    @Column('decimal', { precision: 10, scale: 2 })
    offerPrice: number;

    @Column({
        type: 'enum',
        enum: OrderType,
        default: OrderType.DELIVERY,
    })
    type: OrderType;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({ nullable: true })
    proofOfDeliveryUrl: string;

    @ManyToOne(() => User, (user) => user.id)
    customer: User;

    @ManyToOne(() => User, (user) => user.id, { nullable: true })
    driver: User;

    @OneToMany(() => Bid, (bid) => bid.order)
    bids: Bid[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
