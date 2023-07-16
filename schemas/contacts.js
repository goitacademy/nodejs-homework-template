const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(6).required(),
});

module.exports = { addSchema };
