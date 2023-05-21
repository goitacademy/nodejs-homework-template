const { HttpError } = require("../helpers");

const validate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing required field"));
    }
    next();
  };
  return func;
};

module.exports = validate;
