const pdfParse = require('pdf-parse');

async function extractTextFromPDFBuffer(fileBuffer) {
    try {
        const pdfData = await pdfParse(fileBuffer);
        return pdfData.text.trim();
    } catch (error) {
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
}

module.exports = { extractTextFromPDFBuffer };