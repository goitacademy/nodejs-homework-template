import { HttpError } from "../helpers/index.js";

const validateBody = (schem) => {
  const fn = (req, res, next) => {
    const { error } = schem.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  };
  return fn;
};

export default validateBody;
