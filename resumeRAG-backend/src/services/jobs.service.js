
const fetch = require('node-fetch');

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const ADZUNA_BASE_URL = process.env.ADZUNA_BASE_URL || 'https://api.adzuna.com/v1/api/jobs';
const ADZUNA_COUNTRY = process.env.ADZUNA_COUNTRY || 'us';

if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
  throw new Error('Missing Adzuna API credentials in .env (ADZUNA_APP_ID, ADZUNA_APP_KEY)');
}

function normalizeJob(rawJob) {
  return {
    title: rawJob.title || 'Unknown Title',
    company: rawJob.company?.display_name || 'Unknown Company',
    description: (rawJob.description || '')
      .replace(/<[^>]*>/g, '')
      .trim()
      .slice(0, 300),
    location: rawJob.location?.display_name || 'Location not specified',
    url: rawJob.redirect_url || '',
    salary: rawJob.salary_min && rawJob.salary_max
      ? `$${Math.round(rawJob.salary_min).toLocaleString()} - $${Math.round(rawJob.salary_max).toLocaleString()}`
      : rawJob.salary_min
        ? `From $${Math.round(rawJob.salary_min).toLocaleString()}`
        : null
  };
}

async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {

    const response = await fetch(url);

    if (response.status !== 429) {
      return response;
    }

    if (attempt === maxRetries - 1) {
      throw new Error('RATE_LIMITED: Max retries exceeded');
    }

    const waitMs = Math.pow(2, attempt) * 1000;
    console.log(`Rate limited. Retrying in ${waitMs}ms...`);
    await new Promise(resolve => setTimeout(resolve, waitMs));
  }
}

async function fetchJobsBySkills(skills) {
  if (!Array.isArray(skills) || skills.length === 0) {
    throw new Error('skills must be a non-empty array of strings');
  }
  const topSkills = skills.slice(0, 3);
  const queryString = encodeURIComponent(topSkills.join(' '))
  const params = new URLSearchParams({
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    what: topSkills.join(' '),
    results_per_page: '20',
    'content-type': 'application/json'
  });

  const url = `${ADZUNA_BASE_URL}/${ADZUNA_COUNTRY}/search/1?${params}`;

  try {
    const response = await fetchWithRetry(url);
    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Adzuna returned unexpected response shape — missing results array');
    }
    const normalizedJobs = data.results.map(normalizeJob);

    return normalizedJobs;

  } catch (error) {
    if (error.message.startsWith('RATE_LIMITED') ||
      error.message.startsWith('Adzuna API error')) {
      throw error;
    }
    throw new Error(`Failed to reach Adzuna API: ${error.message}`);
  }
}

module.exports = { fetchJobsBySkills };