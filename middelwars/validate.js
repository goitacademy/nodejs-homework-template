const HttpError = require("../helpers");
const validate = (schema) => {
  const val = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing required name field"));
    }
    next();
  };
  return val;
};
module.exports = validate;
