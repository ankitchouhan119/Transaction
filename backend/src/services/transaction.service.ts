import { v4 } from 'uuid';
import { Transaction } from '../models/transaction.model';
import { ITransaction, TransactionQueryParams } from '../types/transaction.types';

export class TransactionService {
    async createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
        const transaction = new Transaction({
            ...data,
            transactionId: v4(),
            timestamp: new Date(),
        });
        return await transaction.save();
    }

    async getTransactionById(transactionId: string): Promise<ITransaction | null> {
        return await Transaction.findOne({ transactionId });
    }

    async searchTransactions(params: TransactionQueryParams): Promise<{
        transactions: ITransaction[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        const {
            userId,
            startDate,
            endDate,
            description,
            tags,
            country,
            page = 1,
            limit = 10,
            sortBy = 'timestamp',
            sortOrder = 'desc'
        } = params;

        const query: any = {};

        if (userId) query.userId = userId;
        if (country) query.country = country;
        if (tags?.length) query.tags = { $in: tags };
        if (description) query.description = { $regex: description, $options: 'i' };
        if (startDate || endDate) {
            query.timestamp = {};
            if (startDate) query.timestamp.$gte = new Date(startDate);
            if (endDate) query.timestamp.$lte = new Date(endDate);
        }

        const sort: any = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const skip = (page - 1) * limit;

        const [transactions, total] = await Promise.all([
            Transaction.find(query)
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Transaction.countDocuments(query)
        ]);

        return {
            transactions,
            total,
            page,
            totalPages: Math.ceil(total/limit)
        }


    }

    async generateReport(startDate: Date, endDate: Date): Promise<{
        totalTransactions: number;
        totalAmount: number;
        averageAmount: number;
        transactionsByCountry: Record<string, number>;
      }> {
        const aggregation = await Transaction.aggregate([
          {
            $match: {
              timestamp: { $gte: startDate, $lte: endDate }
            }
          },
          {
            $group: {
              _id: null,
              totalTransactions: { $sum: 1 },
              totalAmount: { $sum: '$amount' },
              averageAmount: { $avg: '$amount' },
            }
          }
        ]);
    
        const countryAggregation = await Transaction.aggregate([
          {
            $match: {
              timestamp: { $gte: startDate, $lte: endDate }
            }
          },
          {
            $group: {
              _id: '$country',
              count: { $sum: 1 }
            }
          }
        ]);
    
        const transactionsByCountry = countryAggregation.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {} as Record<string, number>);
    
        const stats = aggregation[0] || {
          totalTransactions: 0,
          totalAmount: 0,
          averageAmount: 0
        };
    
        return {
          ...stats,
          transactionsByCountry
        };
      }


}

export const transactionService = new TransactionService();