const HttpError = require("../routes/api/helpers/index");

const validateBody = (schema) => {
  const func = (res, req, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
