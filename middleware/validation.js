const { createValidationError } = require("../helpers/errorHelpers");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(createValidationError(error));
    }
    next();
  };
};

module.exports = validation;
