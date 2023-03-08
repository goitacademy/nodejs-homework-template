import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { responseError } from 'helpers/apiHelpers';
import { BaseError, ServerError, ValidationError } from 'helpers/errors';

export const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof BaseError) {
    return res.status(error.code).json(responseError(error));
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json(responseError(new ValidationError(error.message)));
  }

  return res.status(500).json(responseError(new ServerError(error.message)));
};
