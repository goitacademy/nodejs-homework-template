const Joi = require('joi');

function favoriteValidation(req, res, next) {
  const productSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const { error } = productSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
}

module.exports = favoriteValidation;
