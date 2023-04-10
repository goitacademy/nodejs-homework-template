const Joi = require('joi');

const registerDataValidator = (data) => Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email : Joi.string().required().min(4).max(255).required().email(),
}).validate(data);

module.exports = registerDataValidator;
