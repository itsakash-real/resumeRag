const { fetchJobsBySkills } = require('../services/jobs.service');

const searchJobs = async (req, res) => {

  const { skills } = req.body;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Request body must include a "skills" array with at least one skill.'
    });
  }

  try {
    const jobs = await fetchJobsBySkills(skills);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      query_skills: skills.slice(0, 3),
      jobs
    });

  } catch (error) {

    if (error.message.startsWith('RATE_LIMITED')) {
      return res.status(429).json({
        success: false,
        error: 'Job search temporarily unavailable. Please try again in a few seconds.'
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { searchJobs };