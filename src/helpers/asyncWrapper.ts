import { Request, Response, NextFunction } from "express";

type CallbackFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const asyncWrapper = (callbacks: Array<CallbackFunction>) =>
  callbacks.map(
    (callback) => async (req: Request, res: Response, next: NextFunction) => {
      try {
        return callback(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  );
export = asyncWrapper;
