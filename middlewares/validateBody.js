const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const valFn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return valFn;
};

module.exports = validateBody;
