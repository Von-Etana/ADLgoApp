import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Referral {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    referralCode: string;

    @ManyToOne(() => User, (user) => user.id)
    referrer: User;

    @ManyToOne(() => User, (user) => user.id)
    referredUser: User;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    bonusAmount: number;

    @Column({ default: 'pending' })
    status: string; // pending, paid

    @CreateDateColumn()
    createdAt: Date;
}
