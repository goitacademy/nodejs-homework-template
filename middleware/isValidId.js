import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

export function isValidId(req, res, next) {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} not valid id`));
  }
  next();
}

export default isValidId;