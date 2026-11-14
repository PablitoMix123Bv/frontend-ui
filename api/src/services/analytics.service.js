import env from '../config/env.js';
import HttpError from '../utils/http-error.js';

const base = env.analytics.baseUrl;

async function post(path, body) {
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new HttpError(502, `Analytics service error ${res.status}`, {
      body: await res.text(),
    });
  }
  return res.json();
}

export const detectTrends = (series) => post('/api/analytics/trends', { series });

export const flammabilityMap = (points, grid) =>
  post('/api/analytics/flammability-map', { points, grid });
