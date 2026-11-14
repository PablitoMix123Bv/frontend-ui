import Investigation from '../models/Investigation.js';
import { answerQuestion } from '../services/devin.service.js';

export async function ask(req, res) {
  const { question } = req.body;

  // TODO: replace naive top-N retrieval with Atlas Vector Search (RAG)
  const contextDocs = await Investigation.find(
    { $text: { $search: question } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(5)
    .lean();

  const result = await answerQuestion(question, contextDocs);
  res.json({ question, ...result });
}
