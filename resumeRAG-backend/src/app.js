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
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
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

