import { NextFunction, Request, Response } from 'express';

export const asyncWrapper =
  (controller: (req: Request, res: Response) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
    controller(req, res).catch(next);
  };

export const responseClientError = (error: Error, statusCode: number) => ({
  status: 'error',
  code: statusCode,
  message: error.message,
  data: 'Not found',
});

export const responseServerError = (error: Error, statusCode: number) => ({
  status: 'fail',
  code: statusCode,
  message: error.message,
  data: 'Internal Server Error',
});

export const responseData = <T>(data: T, statusCode: number) => ({
  status: 'success',
  code: statusCode,
  data,
});
