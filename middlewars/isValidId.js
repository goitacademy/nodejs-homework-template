import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError.js";

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(404, `${contactId} is not valid id`));
  }
  next();
};

export default isValidId;
