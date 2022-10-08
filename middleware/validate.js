const createError = require("../helpers/createError");

const validate = (schema) => {
  const func = (req, res, next) => {
    const body = req.query;
    const { error } = schema.validate(body);
    if (error) {
      next(createError(400, "Bad request"));
    }
    next();
  };
  return func;
};

module.exports = validate;
