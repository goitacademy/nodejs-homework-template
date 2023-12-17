const { Error } = require('../funcHelpers');

const validation = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(Error(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validation;
