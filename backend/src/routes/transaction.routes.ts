import { Router } from 'express';
import { transactionController } from '../controller/transaction.controller';

const router = Router();


router.get('/report', transactionController.generateReport); 
router.get('/:transactionId', transactionController.getTransaction);
router.get('/', transactionController.searchTransactions);
router.post('/', transactionController.createTransaction);
router.put('/:transactionId', transactionController.updateTransaction);

export default router;
