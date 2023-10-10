const HttpError = require("../helpers/HttpError");

const validateBody = (schemas) => {
  const func = (req, res, next) => {
    const { error } = schemas.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
