const { HttpError } = require('../helpers');

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error.details);
      next(HttpError(400, error));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
