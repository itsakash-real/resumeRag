const fs = require('fs').promises;
const pdfParse = require('pdf-parse');

async function extractTextFromPDF(filePath) {
    try {
        const fileBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(fileBuffer);
        return pdfData.text.trim();
    } catch (error) {
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
}

module.exports = { extractTextFromPDF };