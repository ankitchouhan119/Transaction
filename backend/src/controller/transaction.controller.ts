import { Request, Response } from 'express';
import { transactionService } from '../services/transaction.service';
import { TransactionQueryParams } from '../types/transaction.types';

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const transaction = await transactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  }

  async getTransaction(req: Request, res: Response) {
    try {
      const { transactionId } = req.params;
      const transaction = await transactionService.getTransactionById(transactionId);

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve transaction' });
    }
  }

  async searchTransactions(req: Request, res: Response) {
    try {
      const queryParams: TransactionQueryParams = {
        userId: req.query.userId as string,
        startDate: req.query.startDate ? new Date(req.query.startDate as string).toISOString() : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string).toISOString() : undefined,

        description: req.query.description as string,
        tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
        country: req.query.country as string,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        sortBy: req.query.sortBy as 'amount' | 'timestamp',
        sortOrder: req.query.sortOrder as 'asc' | 'desc'
      };

      const result = await transactionService.searchTransactions(queryParams);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search transactions' });
    }
  }

  async generateReport(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const report = await transactionService.generateReport(
        new Date(startDate as string),
        new Date(endDate as string)
      );

      if (req.query.format === 'csv') {
        // Implementation for CSV export
        const csv = this.convertToCSV(report);
        res.header('Content-Type', 'text/csv');
        res.attachment('transaction-report.csv');
        return res.send(csv);
      }

      res.json(report);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate report' });
    }
  }

  private convertToCSV(report: any): string {
    // Implementation of CSV conversion
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Total Transactions', report.totalTransactions],
      ['Total Amount', report.totalAmount],
      ['Average Amount', report.averageAmount],
      ['', ''],
      ['Country', 'Number of Transactions'],
      ...Object.entries(report.transactionsByCountry)
    ];

    return [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
  }
}

export const transactionController = new TransactionController();