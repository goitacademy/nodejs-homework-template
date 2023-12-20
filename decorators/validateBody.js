import helpers from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req, res);
    if (error) {
      return next(helpers.HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
