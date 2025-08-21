import { isValidObjectId } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers/index";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(HttpError(404, `Such ${contactId} is't valid `));
  }
  next();
};

export default isValidId;
