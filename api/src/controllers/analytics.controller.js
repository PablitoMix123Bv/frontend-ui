import { detectTrends, flammabilityMap } from '../services/analytics.service.js';

export async function trends(req, res) {
  res.json(await detectTrends(req.body.series));
}

export async function flammability(req, res) {
  const { points, grid } = req.body;
  res.json(await flammabilityMap(points, grid));
}
