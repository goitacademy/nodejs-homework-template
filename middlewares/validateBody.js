const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const result = schema.validate(req.body);
    const error = result.error;
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;

