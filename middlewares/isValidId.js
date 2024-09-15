import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} not found`));
  }
  next();
};

export default isValidId;
