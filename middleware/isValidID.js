import { isValidObjectId } from "mongoose";

import { HttpErrors } from "../utils/index.js";

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpErrors(404, `${contactId} not valid id`));
  }
  next();
};

export default isValidId;
