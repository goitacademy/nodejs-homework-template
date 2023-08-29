const HttpError = require("../helpers/httpError");

const validateResendRequestBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, "missing required field email"));
    }
    next();
  };
  return func;
};

module.exports = validateResendRequestBody;
