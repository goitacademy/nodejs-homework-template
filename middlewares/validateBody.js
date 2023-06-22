const { httpError } = require('../helpers');

const validateBody = schema => {
  const validator = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    /* pass control to the next function in routes/api */
    next();
  };
  return validator;
};

module.exports = validateBody;
