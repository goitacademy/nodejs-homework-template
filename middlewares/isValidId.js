import { HttpError } from "../helpers/index.js";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw HttpError(400, `${id} is not valid id`);
  }
  next();
};

export default isValidId;
