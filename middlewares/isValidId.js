import { isValidObjectId } from "mongoose";
import { HttpError } from "../utils/HttpError.js";

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(new HttpError(404, `${contactId} is not valid id`));
  }

  next();
};
