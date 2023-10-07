import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId) {
    return next(HttpError(404, `${id} is not valid`))
  }
  next();
}
