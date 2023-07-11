const { HttpError } = require('../helpers');

const validateFavorite = (schema) => {
  const func = (res, req, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, 'missing field favorite'));
    }
    next();
  };
  return func;
};

module.exports = validateFavorite;
