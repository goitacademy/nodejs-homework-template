const { HttpError } = require("../helpers");

const validateBody = (schema, statusCode, errorMessage) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(
          statusCode,
          errorMessage || `missing required /${error.details[0].path[0]}/ field`
        )
      );
    }
    next();
  };
  return func;
};

module.exports = validateBody;
