const HttpError = require("../helpers/HttpError");
const Joi = require('joi');

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body) {
            return next(HttpError(400, 'missing fields'));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }

    next();
  };
  return func;
};




module.exports = validateBody;