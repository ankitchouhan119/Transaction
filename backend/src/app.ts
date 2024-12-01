import express, {Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  connectDB  from './config/database';
import transactionRoutes from './routes/transaction.routes';

dotenv.config();

const app: Application = express();

export default app;
