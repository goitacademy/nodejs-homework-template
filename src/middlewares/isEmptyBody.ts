import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers/index";

const isEmptyBody = async (req: Request, res: Response, next: NextFunction) => {
  const allKeys = Object.keys(req.body);
  if (!allKeys.length) {
    return next(HttpError(400, "Body can't be is empty"));
  }
  next();
};

export default isEmptyBody;
