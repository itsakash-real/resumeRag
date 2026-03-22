
const faiss = require('faiss-node');

const { generateEmbedding } = require('./embeddings.service');
async function buildIndex(items) {

  if (!items || items.length === 0) {
    throw new Error('Cannot build FAISS index from empty items array');
  }

  console.log(`[FAISS] Building index for ${items.length} items...`);

  const embeddings = await Promise.all(
    items.map(item => generateEmbedding(item.text))
  );

  const dimension = embeddings[0].length;

  const index = new faiss.IndexFlatIP(dimension);
  const allVectors = embeddings.flat();

  index.add(allVectors);
  const idMap = items.map(item => item.id);

  console.log(`[FAISS] Index built. ${items.length} vectors indexed.`);

  return { index, idMap };
}
async function queryIndex(index, idMap, queryText, topN = 10) {

  const queryEmbedding = await generateEmbedding(queryText);
  const k = Math.min(topN, idMap.length);
  const { distances, labels } = index.search(queryEmbedding, k);
  const results = [];

  for (let i = 0; i < k; i++) {
    const faissLabel = labels[i];
    const score = distances[i];

    if (faissLabel === -1) continue;

    results.push({
      id: idMap[faissLabel],
      score: parseFloat(score.toFixed(4))
    });
  }
  return results;
}

module.exports = { buildIndex, queryIndex };
