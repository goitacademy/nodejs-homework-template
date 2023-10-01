import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError.js";

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId))
    next(HttpError(404, `${contactId} is not valid`));
  next();
};

export default isValidId;
