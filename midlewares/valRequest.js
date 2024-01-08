const Joi = require('joi');

const validateRequired = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});

const validateOptional = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
}).or('name', 'email', 'phone');

function validateNewContact(req, res, next) {
  const { error } = validateRequired.validate(req.body);
  if (error) {
    next(error);
  }
  next();
}

function validateUpdateContact(req, res, next) {
  const { error } = validateOptional.validate(req.body);
  if (error) {
    next(error);
  }
  next();
}

module.exports = {validateNewContact, validateUpdateContact};