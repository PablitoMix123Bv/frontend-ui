import Investigation from '../models/Investigation.js';
import { rankInvestigations } from '../services/ranking.service.js';

export async function rank(req, res) {
  const { scenario, weights, limit = 20 } = req.body;
  const investigations = await Investigation.find().lean();
  const ranked = rankInvestigations(investigations, scenario, weights).slice(0, limit);
  res.json({ scenario, count: ranked.length, results: ranked });
}
