const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (!req.body || Object.keys(req.body).length === 0) {
        next(HttpError(400, "missing fields"));
      }
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
