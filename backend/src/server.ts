import app from './app';
import connectDB from './config/database';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { transactionGenerator } from './utils/cronJob';
import transactionRoutes from './routes/transaction.routes';

const PORT = process.env.PORT || 7000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/transactions', transactionRoutes);

// CROn JOB control endpoints
app.post('/api/cron/start', (req, res) => {
  const success = transactionGenerator.start();

  if(success){
    res.json({message: 'Transaction generator started'});
  } else {
    res.status(400).json({error:'Transaction generator could not be started'})
  }
});

app.get('/', (req,res) => {
  res.json("API is live")
})

app.post('/api/cron/stop', (req,res)=>{
  const success = transactionGenerator.stop();
  if(success){
    res.json({message: "Transaction generator stopped"})
  }else{
    res.status(400).json({error: "Transaction generator could not be stopped"})
  }
}) 

app.get('/api/cron/status', (req,res) =>{
  res.json(transactionGenerator.getStatus());
});


// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize server
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Allowing CORS for origin: ${corsOptions.origin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

