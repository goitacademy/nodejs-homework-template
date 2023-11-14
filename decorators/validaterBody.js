const HttpError = require("../helpers/HttpError");

const validaterBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError, error.message);
    }
    next();
  };

  return func;
};

module.exports = validaterBody;
