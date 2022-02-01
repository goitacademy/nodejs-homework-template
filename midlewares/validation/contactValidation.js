const Joi = require('joi');

function contactValidation(req, res, next) {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  const { error } = productSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  next();
}

module.exports = contactValidation;
