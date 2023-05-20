const { HttpError } = require('../helpers');

const validateFavorite = (schema) => {
  const func = async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, 'Missing field favorite'));
    }
    next();
  };
  return func;
};

module.exports = validateFavorite;
