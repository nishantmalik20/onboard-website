import { validationResult } from 'express-validator';

/**
 * Middleware that checks express-validator results and returns
 * a 400 response with error details if validation failed.
 */
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return res.status(400).json({ success: false, errors: formatted });
  }
  next();
}
