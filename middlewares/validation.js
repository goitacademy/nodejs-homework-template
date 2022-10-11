const { RequestError } = require("../helpers");

const validation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(error.status, error.message));
    }
    next();
  };

  return func;
};

module.exports = validation;
