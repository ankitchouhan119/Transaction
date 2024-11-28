import express, {Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  connectDB  from './config/database';
import transactionRoutes from './routes/transaction.routes';

dotenv.config();

const app: Application = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database connection
// connectDB();


// // Routes
// app.use('/api/transactions', transactionRoutes);

export default app;
