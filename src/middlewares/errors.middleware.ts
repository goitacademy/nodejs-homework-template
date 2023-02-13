import { NextFunction, Request, Response } from 'express';
import { responseClientError, responseServerError } from 'helpers/apiHelpers';
import { BaseError } from 'helpers/errors';

export const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof BaseError) {
    return res.status(error.status).json(responseClientError(error, error.status));
  }
  return res.status(500).json(responseServerError(error, 500));
};
