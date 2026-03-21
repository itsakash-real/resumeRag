const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { extractTextFromPDF } = require('../services/parser.service');

//MULTER CONFIGURATION
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/pdf') {
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

    const filePath = req.file.path;

    try {
        const extractedText = await extractTextFromPDF(filePath);
        await fs.unlink(filePath);

        return res.status(200).json({
            success: true,
            text: extractedText
        });
    } catch (error) {
        try {
            await fs.unlink(filePath);
        } catch {

        }

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { upload, uploadResume };