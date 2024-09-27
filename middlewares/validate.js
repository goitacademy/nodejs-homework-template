const { HttpError } = require("../helpers/httpError");

const validation = (schema) => {
  const exam = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return exam;
};

module.exports = validation;