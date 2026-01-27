const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');

const trainRoutes = require('./src/routes/trains');
const stationRoutes = require('./src/routes/stations');
const reportRoutes = require('./src/routes/reports');
const suggestionRoutes = require('./src/routes/suggestions');
const routeRoutes = require('./src/routes/routes');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'BharatRail API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/routes', routeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`BharatRail Backend Server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET  /api/trains`);
  console.log(`  GET  /api/stations`);
  console.log(`  GET  /api/reports`);
  console.log(`  POST /api/reports`);
  console.log(`  GET  /api/suggestions`);
  console.log(`  GET  /api/routes`);
});
