import env from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, _req, res, _next) {
  const status = err.status ?? 500;
  const body = {
    error: {
      message: err.message ?? 'Internal server error',
      ...(err.details && { details: err.details }),
      ...(env.nodeEnv !== 'production' && { stack: err.stack }),
    },
  };
  if (status >= 500) console.error('[api]', err);
  res.status(status).json(body);
}
