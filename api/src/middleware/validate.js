import HttpError from '../utils/http-error.js';

/**
 * Minimal body validator for hackathon scope.
 * rules: { field: { required, type: 'string'|'number'|'boolean'|'object'|'array' } }
 */
export function validateBody(rules) {
  return (req, _res, next) => {
    const errors = [];
    for (const [field, rule] of Object.entries(rules)) {
      const value = req.body?.[field];
      if (value === undefined || value === null) {
        if (rule.required) errors.push(`${field} is required`);
        continue;
      }
      const ok =
        rule.type === 'array' ? Array.isArray(value) : typeof value === rule.type;
      if (!ok) errors.push(`${field} must be of type ${rule.type}`);
    }
    if (errors.length) return next(new HttpError(400, 'Validation failed', { errors }));
    next();
  };
}
