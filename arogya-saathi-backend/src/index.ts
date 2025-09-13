import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import healthRoutes from './routes/healthRoutes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
// CORS for cross-origin requests
app.use(cors());
// Logging
app.use(morgan('combined'));
// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/health', healthRoutes);

// Basic route for health check
app.get('/', (req, res) => {
  res.send('Arogya Saathi Backend is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});