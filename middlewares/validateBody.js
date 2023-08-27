const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;
      next(HttpError(400, `missing required ${missingField} field`));
    }
    next();
  };
  return func;
};

const validateBodyFavorite = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing field favorite");
    }
    next();
  };
  return func;
};
module.exports = { validateBody, validateBodyFavorite };
