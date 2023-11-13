const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error: err } = schema.validate(req.body);
    if (err) {
      next(HttpError(400, err.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
