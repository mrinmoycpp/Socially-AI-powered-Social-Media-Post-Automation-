import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDB from './config/db.js';
const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is Live!');
});

try {
  app.use('/api/auth', (await import('./routes/authRoutes.js')).default);
  app.use('/api/social', (await import('./routes/socialAuthRoutes.js')).default);
} catch (error) {
  console.error('Error loading routes:', error);
}


//Global Error Handler
app.use((err: any, _req: Request, res: Response, _next:NextFunction)=> {
    console.error(err);
    res.status(500).send(err?.response?.data?.message || 'Internal Server Error');
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});