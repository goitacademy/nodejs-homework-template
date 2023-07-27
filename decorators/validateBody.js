import { HttpError } from "../helpers/index.js";

const validateBody = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
