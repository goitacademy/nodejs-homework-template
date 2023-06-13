const HttpError = require("../helpers/HttpError.js");

const validateEmailBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (Object.entries(req.body).length === 0) {
        next(HttpError(400, `missing required field email`));
      }
      next(HttpError(400, `Verification has already been passed`));
    }
    next();
  };
  return func;
};

module.exports = validateEmailBody;
