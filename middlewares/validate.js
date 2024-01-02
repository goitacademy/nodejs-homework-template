const { HttpError } = require('../helpers');

const validate = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (Object.keys(req.body).length === 0) {
        next(HttpError(400, 'Missing fields'));
      } else next(HttpError(400, 'Missing required name field'));
    }

    next();
  };
  return func;
};

module.exports = validate;
