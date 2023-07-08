const { HttpError } = require('../helpers/HttpError')

const validateBody = (schema) => {
    const func = async (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        next(new HttpError(400, error.message));
      }
      next();
    };
    return func;
  };
  module.exports = validateBody;