import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";
import { HTTP_STATUS } from "../constants/index.js";

export const validateId = ({ params: { id } }, res, next) => {
  if (isValidObjectId(id)) return next();
  throw HttpError(HTTP_STATUS.badRequest, `"${id}" invalid id`);
};
