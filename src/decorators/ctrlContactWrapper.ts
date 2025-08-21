import type { Request, Response, NextFunction } from "express";

const ctrlContactWrapper = (ctrl: Function) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

export default ctrlContactWrapper;
