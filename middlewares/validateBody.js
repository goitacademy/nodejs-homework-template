const createError = require("http-errors");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, "one of the fields missed(name, email, phone"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
