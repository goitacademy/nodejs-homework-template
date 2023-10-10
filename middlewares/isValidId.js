import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { id, contactId } = req.params;
  if (!isValidObjectId(id || contactId)) {
    return next(HttpError(404, `${id || contactId} not valid id`));
  }
  next();
};

export default isValidId;
