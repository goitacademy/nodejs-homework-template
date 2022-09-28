const createError = require("http-errors");

function validation(scheme) {
  return (req, res, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    next();
  };
}

module.exports = validation;
