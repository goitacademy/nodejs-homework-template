/** @format */

import { HttpError } from "../helpers/index.js";
import { contactAddSchema } from "../models/Contact.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
