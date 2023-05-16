const { HttpError } = require('../helpers');

const validateBody = (schema) => {
  const func = async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, 'Missing required fields'));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
