const { httpError } = require("../units");

const validateFields = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
      return;
    }
    next();
  };
  return func;
};

module.exports = validateFields;
