const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

module.exports = app;
