const { httpError } = require("../../helpers");

const validateFavorite = (schema) => {
  return async (req, res, next) => {
    req.body.favorite ?? next(httpError(400, "missing field favorite"));

    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }
    next();
  };
};

module.exports = {
  validateFavorite,
};
