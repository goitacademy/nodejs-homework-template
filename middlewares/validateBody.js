const { HttpError } = require('../utils');

const validateBody = (schema) => {
  const fn = (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return fn;
};

module.exports = validateBody;
