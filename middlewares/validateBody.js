const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body) {
            return next(HttpError(400, 'missing fields'));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, 'missing required name field'));
    }

    next();
  };
  return func;
};


module.exports = validateBody;