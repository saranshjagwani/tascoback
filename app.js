const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS FIX HERE
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'https://tascotracker.netlify.app'], // ✅ include Netlify domain
  credentials: true, // only if you use cookies/auth headers
}));

app.use(express.json());

app.use('/api', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

module.exports = app;
