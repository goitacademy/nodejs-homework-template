const { RequestError } = require('../helpers');

const validateContactBody = schema => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error?.message === '"favorite" is required') {
      throw RequestError(400, 'missing field favorite!');
    }

    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateContactBody;
