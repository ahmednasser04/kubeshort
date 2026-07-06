import type { ErrorRequestHandler } from 'express';

import { env } from '../config/env';
import { AppError } from '../utils/app-error';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.details,
      message: error.message,
      success: false
    });
  }

  console.error(error);

  return res.status(500).json({
    error: env.isProduction ? undefined : error,
    message: 'Internal server error',
    success: false
  });
};
