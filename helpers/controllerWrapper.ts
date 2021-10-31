import {Request, Response, NextFunction} from 'express';

const asyncWrapper = (callbacks : Array<Function>) =>
  callbacks.map((callback) =>
    async (req : Request,  res : Response, next : NextFunction ) => {
      try {
        return callback(req, res, next);
      } catch (error) {
        next(error);
      }
    },
  )
;

export = asyncWrapper;