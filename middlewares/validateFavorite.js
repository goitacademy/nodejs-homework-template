const { HttpError } = require("../helpers");

const validateFavorite = (schema) => {
  const valid = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return valid;
};

module.exports = validateFavorite;
