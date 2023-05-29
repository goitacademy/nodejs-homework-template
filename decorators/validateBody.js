const { HttpError } = require('../helpers');

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }
    next(error);
  };
  return func;
};

module.exports = validateBody;
