const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(404, "missing fields"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
