const express = require('express');
const router = express.Router();
const { searchJobs } = require('../controllers/jobs.controller');

// POST /api/jobs/search
// Body: { "skills": ["React", "Node.js", "TypeScript"] }
router.post('/search', searchJobs);

module.exports = router;