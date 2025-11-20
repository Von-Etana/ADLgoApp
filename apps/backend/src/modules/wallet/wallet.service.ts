import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Wallet } from '../../entities/Wallet.entity';
import { Transaction, TransactionType, TransactionStatus } from '../../entities/Transaction.entity';
import { User } from '../../entities/User.entity';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepo: Repository<Wallet>,
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
        private dataSource: DataSource, // For transactions
    ) { }

    async getBalance(userId: string): Promise<number> {
        const wallet = await this.walletRepo.findOne({ where: { user: { id: userId } } });
        return wallet ? wallet.balance : 0;
    }

    // Commission Logic: 80% Driver, 20% Admin
    async processOrderPayment(orderTotal: number, driverId: string, paymentMethod: 'WALLET' | 'CASH') {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const driverWallet = await queryRunner.manager.findOne(Wallet, { where: { user: { id: driverId } } });
            if (!driverWallet) throw new Error('Driver wallet not found');

            const commissionAmount = orderTotal * 0.20;
            const driverEarnings = orderTotal * 0.80;

            if (paymentMethod === 'WALLET') {
                // Customer paid via Wallet (already deducted from customer in a separate step usually)
                // We credit the Driver with 80%

                driverWallet.balance = Number(driverWallet.balance) + driverEarnings;

                const creditTx = new Transaction();
                creditTx.amount = driverEarnings;
                creditTx.type = TransactionType.DEPOSIT; // Or PAYMENT
                creditTx.status = TransactionStatus.SUCCESS;
                creditTx.description = 'Ride Earnings (Wallet Payment)';
                creditTx.wallet = driverWallet;

                await queryRunner.manager.save(Transaction, creditTx);
                await queryRunner.manager.save(Wallet, driverWallet);

                // Admin wallet logic would go here (credit 20%)

            } else if (paymentMethod === 'CASH') {
                // Customer paid Cash to Driver directly.
                // Driver has full amount (100%). We need to DEDUCT 20% commission from Driver's wallet.

                if (Number(driverWallet.balance) < commissionAmount) {
                    // In a real app, we might allow negative balance up to a limit, or block this earlier.
                    // For now, we deduct anyway, potentially going negative.
                }

                driverWallet.balance = Number(driverWallet.balance) - commissionAmount;

                const debitTx = new Transaction();
                debitTx.amount = commissionAmount;
                debitTx.type = TransactionType.COMMISSION;
                debitTx.status = TransactionStatus.SUCCESS;
                debitTx.description = 'Commission Deduction (Cash Order)';
                debitTx.wallet = driverWallet;

                await queryRunner.manager.save(Transaction, debitTx);
                await queryRunner.manager.save(Wallet, driverWallet);
            }

            await queryRunner.commitTransaction();
            return { success: true, newBalance: driverWallet.balance };

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async checkMinimumBalance(driverId: string, threshold: number = 1000): Promise<boolean> {
        const balance = await this.getBalance(driverId);
        return balance >= threshold;
    }
}
