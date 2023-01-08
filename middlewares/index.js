const { HttpError } = require("../helpers/index");

function validateBody(shema) {
  return (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    return next();
  };
}

module.exports = {
  validateBody,
};
