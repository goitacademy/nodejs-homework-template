const { HttpError } = require("../helpers");

const validateAdd = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "Missing required name field"));
    }
    next();
  };

  return func;
};

module.exports = validateAdd;
