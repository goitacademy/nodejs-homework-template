const { httpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(httpError(400, "missing fields"));
      return;
    }
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = { validateBody };
