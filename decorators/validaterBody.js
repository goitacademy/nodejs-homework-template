import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const fun = (req, res, next) => {
    const { error } = schema.validateBody(req.body);
    if (error) {
      return next(HttpError(400, error.massege));
    }
    next();
  };
  return fun;
};

export default validateBody;
