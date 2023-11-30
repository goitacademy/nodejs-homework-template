import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404));
  }
  if (!req.body.favorite) {
    return next(HttpError(400, "missing field favorite"));
  }
  next();
};
export default isValidId;