const express = require('express');
const cors = require('cors');

// Initialize database schema
require('./database/schema');

const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Route modules
const authRoutes = require('./routes/authRoutes');
const goalsRoutes = require('./routes/goalsRoutes');
const logsRoutes = require('./routes/logsRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// ─── Global Middleware ───
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.startsWith('http://localhost') || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ─── Routes ───
app.get('/ping', (req, res) => {
    // Send a tiny 200 OK response with no external queries
    res.status(200).send('OK'); 
});

app.use('/api/auth', authRoutes);
app.use('/api/goals', auth, goalsRoutes);
app.use('/api/logs', auth, logsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', nutritionRoutes);          // public — barcode & search proxies

// ─── Error Handler ───
app.use(errorHandler);

module.exports = app;
