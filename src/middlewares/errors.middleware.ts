import { NextFunction, Request, Response } from 'express';
import { responseError } from 'helpers/apiHelpers';
import { BaseError, ServerError } from 'helpers/errors';

export const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof BaseError) {
    return res.status(error.code).json(responseError(error));
  }

  return res.status(500).json(responseError(new ServerError(error.message)));
};
