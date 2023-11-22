import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    return next(HttpError(404, "ID is not valid"));
  }
  next();
};

export default isValidId;
