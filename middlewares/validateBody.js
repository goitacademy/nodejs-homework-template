const { httpError } = require("../utils/httpError");

const validateBody = (schema) => {
  const foo = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return foo;
};

module.exports = {
  validateBody,
};
