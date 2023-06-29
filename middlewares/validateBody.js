const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMesage =
        error.message === `"favorite" is required`
          ? 'missing field favorite'
          : error.message;

      next(HttpError(400, errorMesage));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
