import Investigation from '../models/Investigation.js';
import HttpError from '../utils/http-error.js';

export async function list(req, res) {
  const { q, acronym, gravity, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (acronym) filter.acronym = acronym;
  if (gravity) filter.gravityLevel = gravity;

  const [items, total] = await Promise.all([
    Investigation.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean(),
    Investigation.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
}

export async function getById(req, res, next) {
  const doc = await Investigation.findById(req.params.id).lean();
  if (!doc) return next(new HttpError(404, 'Investigation not found'));
  res.json(doc);
}
