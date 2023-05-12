const HttpError = require("../helpers/HttpError");

const validateBodyFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const match = error.message.match(/"([^"]*)"/);
      next(HttpError(400, `missing  ${match[1]} field`));
    }
    next();
  };

  return func;
};

module.exports = validateBodyFavorite;
