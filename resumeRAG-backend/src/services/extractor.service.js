const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY environment variable is not set. Please check your .env file.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: `You are a resume data extraction API. 
Your only function is to extract structured information from resume text.
You must respond with a single valid JSON object.
Do not include markdown code fences, backticks, explanations, 
or any text outside the JSON object.
Your response must be parseable by JSON.parse() with no preprocessing.`
});

/*
Expected shape:
{
  skills: string[],
  experience_years: number,
  job_titles: string[],
  education: string,
  summary: string
}
*/

async function extractProfileFromResume(resumeText) {
    if(!resumeText || resumeText.trim().length == 0) {
        throw new Error('Resume text is empty. Cannot extract profile.');
    }

    const safeText = resumeText.length > 15000
      ? resumeText.slice(0, resumeText.lastIndexOf('\n', 15000))
      : resumeText;

    const prompt = `Extract structured data from the resume below.
    
    Return ONLY this exact JSON structure with these exact key names:
{
  "skills": ["array of technical and soft skills"],
  "experience_years": 0,
  "job_titles": ["array of job titles, most recent first"],
  "education": "highest degree and institution as one string",
  "summary": "2-sentence professional summary inferred from the resume"
}

Rules:
- skills: include both technical (React, Python) and soft (leadership, communication) skills
- experience_years: return as a number only (e.g. 5, not "5 years")
- job_titles: extract exact titles as written in the resume
- education: if multiple degrees, return only the highest one
- summary: write this yourself based on the resume — do not copy text verbatim

Resume text:
${safeText}

Respond with only the JSON object:`;

try {
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const cleanJsonText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJsonText);
    const requiredKeys = ['skills', 'experience_years', 'job_titles', 'education', 'summary'];
    const missingKeys = requiredKeys.filter(key => !(key in parsed));

    if (missingKeys.length>0 ) {
        throw new Error(`Gemini response is missing required fields: ${missingKeys.join(', ')}`);
    }
    return parsed;
} catch (error) {
    if(error instanceof SyntaxError) {
        throw new Error(`Gemini returned JSON. Raw response was: ${error.message}`);
    }
    throw new Error(`Profile extraction failed: ${error.message}`);
}
}

    module.exports = { extractProfileFromResume };