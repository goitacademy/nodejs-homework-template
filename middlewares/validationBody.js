import { RequestError } from "../helpers/RequestError.js";

export const validationBody = (schema) => {
  return async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };
};
