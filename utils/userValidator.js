const Joi = require('joi');

const userDataValidator = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(3).required(),
});

const userEditDataValidator = Joi.object({
  name: Joi.string().trim().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(3),
  favorite: Joi.boolean(),
});

module.exports = { userDataValidator, userEditDataValidator };
