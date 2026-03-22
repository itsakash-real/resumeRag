const express = require('express');
const router = express.Router();
const { upload, uploadResume, analyzeResume, matchResume } = require('../controllers/resume.controller');
router.post('/match', matchResume);
router.post('/upload', upload.single('resume'), uploadResume);
router.post('/analyze', analyzeResume);
module.exports = router;