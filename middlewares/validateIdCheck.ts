import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers";

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw HttpError(400, `Contact with this ID: ${contactId} was not found`);
  }
  next();
};

export default isValidId;
