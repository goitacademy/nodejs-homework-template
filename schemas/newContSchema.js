const Joi = require('joi');

const newContSchema = Joi.object({
  id: Joi.any(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = newContSchema;
