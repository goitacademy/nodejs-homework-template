const { HttpError } = require("../helpers");

const validate = (schema) => {
  const func = (reg, res, next) => {
    const { error } = schema.validate(reg.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
module.exports = validate;
