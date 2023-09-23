const HttpError = require("../helpers/HttpError");

const validateFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { length } = Object.keys(req.body);

      if (!length) {
        next(HttpError(400, "missing field favorite"));
      }

      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateFavorite;
