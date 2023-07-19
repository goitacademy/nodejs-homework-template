import { HttpError } from "../helpers/HttpError.js";

const validateBody = schema => {
  const func = (req, res, next) => {

    const isBodyEmpty = Object.keys(req.body).length === 0 ? true : false;

    const { error } = schema.validate(req.body);
    if (isBodyEmpty && error.message !== '"favorite" is required')
          { throw HttpError(400, "missing fields") };

    if (error) {
      switch (error.message) {
        case '"email" is required':
          throw HttpError(400, "missed required email field");
        case '"name" is required':
          throw HttpError(400, "missed required name field");
        case '"phone" is required':
          throw HttpError(400, "missed required phone field");
        case '"favorite" is required':
          throw HttpError(400, "missing field favorite");
        default:
          next(HttpError(400, error.message));
          break;
      }
    }
    next();
  };
  return func;
};

export default validateBody;
