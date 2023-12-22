import { isValidObjectId } from "mongoose";
import helpers from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(helpers.HttpError(400, `${contactId} is not a valid id`));
  }
  next();
};

export default isValidId;
