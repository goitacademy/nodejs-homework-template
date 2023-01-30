const { HttpErrors } = require("../helpers/index");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpErrors(400, "Missing required name field"));
    }
    return next();
  };
}

module.exports = {
  validate,
};
