const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    console.log(req.method);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      if (req.method === 'PATCH') {
        throw HttpError(400, 'missing field favorite');
      }
      throw HttpError(400);
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }

    next(error);
  };
  return func;
};
module.exports = validateBody;
