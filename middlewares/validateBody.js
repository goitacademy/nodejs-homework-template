const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const warn = `missing ${error.message}`;
      next(HttpError(400, warn));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
