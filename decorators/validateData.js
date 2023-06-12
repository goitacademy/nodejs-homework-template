const { HttpError } = require("../helpers");

const validateData = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    } else if (error) {
      next(HttpError(400, error.message));
    } else {
      next();
    }
  };
  return func;
};

module.exports = validateData;
