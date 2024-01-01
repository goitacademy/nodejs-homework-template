import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/http-error.js";

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(HttpError(401, `${req.params.id} not valid id`));
  }
  next();
};

export default isValidId;
