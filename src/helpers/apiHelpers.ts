import { NextFunction, Request, Response } from 'express';
import { BaseError } from './errors';

export const asyncWrapper =
  (controller: (req: Request, res: Response) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
    controller(req, res).catch(next);
  };

export const responseError = (error: BaseError) => ({
  status: error.status,
  code: error.code,
  message: error.message,
  data: error.data,
});

export const responseData = <T>(data: T, statusCode: number) => ({
  status: 'success',
  code: statusCode,
  data,
});
