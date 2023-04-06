const Joi = require('joi');

const addShema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const updateShema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
}).or("name", "phone", "email");

module.exports = { addShema, updateShema } ;