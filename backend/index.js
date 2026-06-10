import express, { json } from 'express';
import cors from 'cors';
import connectDB from './connect.js';
import authRoutes from './routes/authroutes.js';
import workflowRoutes from './routes/workflowroutes.js';
import webhookRoutes from './routes/webhookroutes.js';
import { config } from 'dotenv';

config();

const app = express();

app.use(cors());
app.use(json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/hooks', webhookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FlowWeaver full-stack engine running on port ${PORT}`);
});