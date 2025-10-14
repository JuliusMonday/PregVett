const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // your frontend dev server
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
connectDB();

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pregnancies', require('./routes/pregnancies'));
app.use('/api/foods', require('./routes/foods'));
app.use('/api/symptoms', require('./routes/symptoms'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/emergency', require('./routes/emergency'));
app.use('/api/community', require('./routes/community'));
app.use('/api/education', require('./routes/education'));
app.use('/api/health', require('./routes/health'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PregVett API is running' });
});

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });
// app.get("/check", (req, res) => {
//   res.status(200).send("server working")
// })
// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});