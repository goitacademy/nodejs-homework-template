import { HttpError } from "../helpers/HttpError.js";

const validateBody = schema => {
  const func = (req, res, next) => {
    const { email, name, phone } = req.body;
    const isBodyEmpty = Object.keys(req.body).length === 0 ? true : false;
    if (isBodyEmpty) throw HttpError(400, "missing fields");
    if (!email) throw HttpError(400, "missed required email field");
    if (!name) throw HttpError(400, "missed required name field");
    if (!phone) throw HttpError(400, "missed required phone field");

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
