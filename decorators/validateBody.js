import { HttpError } from "../Helpers/index.js";

const validateBody = (schena) => {
  const func = (req, res, next) => {
    const { error } = schena.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
