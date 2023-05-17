const { HttpError } = require('../helpers');

const validateStatusBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (!Object.keys(req.body).length) {
        next(HttpError(400, `missing field favorite`));
      }
    }
    next();
  };
  return func;
};

module.exports = validateStatusBody;
