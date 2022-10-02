const { RequestError } = require('../utils');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error.message);
      next(RequestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
