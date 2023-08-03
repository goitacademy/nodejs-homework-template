import { HttpError } from "../helpers/index.js";

const validateQuery = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateQuery;
