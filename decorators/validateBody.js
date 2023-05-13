const { HttpError } = require("../helpers/HttpError");

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, (error.message = "missing fields")));
    }
    next();
  };
  return fn;
};

module.exports = validateBody;
