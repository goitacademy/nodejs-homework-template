const { httpError } = require("../helpers");

function validateUser(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }
    next();
  };
}

module.exports = { validateUser };
