import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isvalidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(404, `${id} is not valid id`));
  }
  next();
};

export default isvalidId;
