import { HttpError } from "../helpers/index.js";

const validateBody = (valShema) => {
  const func = (req, res, next) => {
    const { error } = valShema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
      return;
    }
    next();
  };
  return func;
};
export default validateBody;
