import { Router } from 'express';
import {transactionController} from '../controller/transaction.controller';

const router = Router();

router.post('/', transactionController.createTransaction);
router.get('/:transactionId', transactionController.getTransaction); // Assuming `transactionId` is a path parameter
router.get('/search', transactionController.searchTransactions);
router.get('/report', transactionController.generateReport);

export default router;
