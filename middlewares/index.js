const { createError } = require("../helpers/index");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(createError(400, error.message));
    }

    return next();
  };
};

module.exports = {
  validateBody,
};
