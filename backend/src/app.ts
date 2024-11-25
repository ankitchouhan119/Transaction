import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) =>{
    res.status(200).send("API is running!")
})

export default app;
