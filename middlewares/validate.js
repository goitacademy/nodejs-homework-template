const { HttpError } = require('../helpers');

const validate = schema => {
  const func = async (req, res, next) => {
    try {
      await schema.validate();
      next();
    } catch (error) {
      next(HttpError(400, error.message));
    }
  };
  return func;
};

module.exports = validate;
