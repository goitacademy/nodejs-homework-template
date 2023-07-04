const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = {
  validateBody,
};
