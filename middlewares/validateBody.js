const { updateFavoriteSchema } = require('../schemas');
const { httpError } = require('../utils');

const validateBody = schema => {
  const func = (req, _, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      if (schema === updateFavoriteSchema)
        throw httpError(400, 'missing fields favorite');

      throw httpError(400, 'missing fields');
    }

    const { error } = schema.validate(req.body);

    if (error) {
      next(httpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
