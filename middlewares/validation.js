const { HttpError } = require("../helpers/HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

module.exports = {
  validateBody,
  validateParams,
};
