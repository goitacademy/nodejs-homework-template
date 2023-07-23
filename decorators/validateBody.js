import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (rec, res, next) => {
    const { error } = schema.validate(rec.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
