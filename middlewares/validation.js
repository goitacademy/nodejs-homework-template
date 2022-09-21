const { ValidationError } = require("../helpers");

const validation = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(new ValidationError("missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError(error.details[0].message));
    }

    next();
  };
};

module.exports = validation;
