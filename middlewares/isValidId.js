import { isValidObjectId } from "mongoose";
import HttpError from "../helpters/HttpError.js";

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  
  if (!isValidObjectId(contactId)) {
    return next(HttpError(404));
  }
  next();
};
export default isValidId;
