import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const isBodyEmpty = Object.keys(req.body).length === 0 ? true : false;
    if (isBodyEmpty) throw HttpError(400, "missing fields");

    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
