require('dotenv').config();
const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resume.routes');
const jobRoutes = require('./routes/jobs.routes');
const { initModel } = require('./services/embeddings.service');

const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use('/api/jobs', jobRoutes);
app.use('/api/resume', resumeRoutes);

//ROUTES
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date()
  });
});

initModel().then(() => {
  console.log('[Startup] Embedding model warm and ready');
});
//START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});

module.exports = app;

