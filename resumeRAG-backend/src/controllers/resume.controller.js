const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const multer = require('multer');
const { extractTextFromPDFBuffer } = require('../services/parser.service');
const { extractProfileFromResume } = require('../services/extractor.service');
const { buildIndex, queryIndex } = require('../services/faiss.service');
const { fetchJobsBySkills } = require('../services/jobs.service');


const matchResume = async (req, res) => {
  const { resumeText, profile } = req.body;

  if (!resumeText && !profile) {
    return res.status(400).json({
      success: false,
      error: 'Provide either "resumeText" (raw string) or "profile" (extracted JSON)'
    });
  }

  try {
    let resolvedProfile = profile;

    if (!resolvedProfile) {
      resolvedProfile = await extractProfileFromResume(resumeText);
    }

    if (!resolvedProfile.skills || !Array.isArray(resolvedProfile.skills) || resolvedProfile.skills.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Extracted profile must contain a non-empty "skills" array'
      });
    }

    const jobs = await fetchJobsBySkills(resolvedProfile.skills);

    if (jobs.length === 0) {
      return res.status(200).json({
        success: true,
        matches: [],
        message: 'No jobs found for these skills'
      });
    }

    const indexItems = jobs.map((job, i) => ({
      id: String(i),
      text: `${job.title} ${job.description}`
    }));

    const { index, idMap } = await buildIndex(indexItems);

    const queryText = resolvedProfile.summary || (resumeText ? resumeText.slice(0, 512) : '');
    const topMatches = await queryIndex(index, idMap, queryText, 10);

    const enrichedMatches = topMatches.map(match => ({
      ...jobs[parseInt(match.id)],
      similarity_score: match.score
    }));

    return res.status(200).json({
      success: true,
      profile: resolvedProfile,
      match_count: enrichedMatches.length,
      matches: enrichedMatches
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

//MULTER CONFIGURATION
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

//CONTROLLER FUNCTION
const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded. Please attach a PDF file.'
    });
  }

  try {
    const extractedText = await extractTextFromPDFBuffer(req.file.buffer);

    return res.status(200).json({
      success: true,
      text: extractedText
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const analyzeResume = async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText || typeof resumeText !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Request body must include a "resumeText" string field.'
    });
  }
  try {
    const profile = await extractProfileFromResume(resumeText);
    return res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
module.exports = { upload, uploadResume, analyzeResume, matchResume };