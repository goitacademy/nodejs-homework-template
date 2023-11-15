import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/HttpError.js";

const isvalidId = (req, _, next) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

export default isvalidId;
