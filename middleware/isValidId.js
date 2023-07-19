import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/HttpError.js";

export default function isValidId(req, res, next) {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    HttpError(400, `${id} is not a valid`);
  }
  next();
}
