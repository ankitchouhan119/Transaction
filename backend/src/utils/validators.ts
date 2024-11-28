import {body, query} from 'express-validator';

export const createTransactionValidator = [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('amount').isNumeric().withMessage('Amount must be number'),
    body('description').notEmpty().withMessage('Desc is required'),
    body('country').notEmpty().withMessage('Country is required'),
];

export const reportQueryValidator = [
    query('startDate').optional().isISO8601().toDate().withMessage('Start date must be a valid date'),
    query('endDate').optional().isISO8601().toDate().withMessage('End date must be a valid date'),
];