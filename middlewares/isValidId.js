import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const id = req.params.contactId || req.params.verificationToken;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `'${id}' is not valid id.`));
  }
  next();
};

export default isValidId;
