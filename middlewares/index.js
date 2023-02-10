const { ValidationError } = require("../helpers/index");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(ValidationError(400, error.message));
    }
    return next();
  };
}

module.exports = {
  validate,
};
