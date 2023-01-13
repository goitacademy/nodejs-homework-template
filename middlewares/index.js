const { httpError } = require("../helpers");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(httpError(400, "missing required name field"));
    }
    return next();
  };
}

module.exports = {
  validateBody,
};
