const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = ({ body }, res, next) => {
    const { error } = schema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  };

  return func;
};

module.exports = validateBody;
