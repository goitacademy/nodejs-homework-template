const { httpError } = require("../helpers");

function validateBody(schema) {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(httpError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);

    if (error) {
      return next(httpError(400, error.message));
    }

    return next();
  };
}

module.exports = {
  validateBody,
};
