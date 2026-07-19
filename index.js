import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import connectDB from './config/config.js';
import registrationRoutes from './routes/registrationRoutes.js';

// Set DNS servers to Google DNS to bypass local/ISP SRV lookup blocks
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Load env variables from absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env');
const dotenvResult = dotenv.config({
  path: envPath,
  override: true,
});
console.log('Dotenv Load Path:', envPath);
console.log('Dotenv Load Result:', dotenvResult);

// Connect to MongoDB Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/register', registrationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Backend service is running smoothly.',
    timestamp: new Date(),
  });
});

// Root fallback route
app.get('/', (req, res) => {
  res.send('Welcome to the EventView Queens College API');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
