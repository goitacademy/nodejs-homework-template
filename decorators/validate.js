import { HttpError } from "../helpers/index.js";

const validate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(HttpError(400));
    }
    next();
  };

  return func;
};

export default validate;
