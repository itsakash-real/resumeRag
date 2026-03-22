
const { HfInference } = require('@huggingface/inference');

let hf = null;

async function initModel() {
  if (hf !== null) return;

  // Initialize Hugging Face Inference client
  const token = process.env.HF_TOKEN || "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";
  hf = new HfInference(token);

  console.log('[Embeddings] Hugging Face Inference client ready.');
}

// FAISS specifically expects Float32Array input
async function generateEmbedding(text) {

  await initModel();

  const cleanText = text.replace(/\s+/g, ' ').trim();
  if (!cleanText) {
    throw new Error('Cannot generate embedding for empty text');
  }

  const truncated = cleanText.slice(0, 512);

  // Generate embeddings using Hugging Face Inference API
  const result = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: truncated
  });

  // Handle both 1D and 2D array responses from Hugging Face safely
  const vector = Array.isArray(result[0]) ? result[0] : result;

  return vector;
}

module.exports = { initModel, generateEmbedding };