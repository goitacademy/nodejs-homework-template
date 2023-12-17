import { HttpError } from "../utils/HttpError.js";

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(406, error.message);
    }
    next();
  };
};
