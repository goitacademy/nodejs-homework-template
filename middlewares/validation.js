const createError = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

const paramValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      throw createError(400, "Bad id");
    }
    next();
  };
};

module.exports = {
  validation,
  paramValidation,
};
