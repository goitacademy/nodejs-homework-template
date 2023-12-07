import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw HttpError(400, `Contact with this ID: ${contactId} was not found`);
  }
  next();
};

export default isValidId;
