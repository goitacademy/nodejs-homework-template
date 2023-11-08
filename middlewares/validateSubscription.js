const { HttpError } = require('../helpers');

const validateSubscription = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, 'Not valid field'));
    }
    next();
  };
  return func;
};

module.exports = validateSubscription;
