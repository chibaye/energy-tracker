import express from 'express';
import dotenv from 'dotenv';
import usageRoutes from './routes/usage.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/usage', usageRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Energy Usage Tracker API is running!' });
});

// Initialize database and start server
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();